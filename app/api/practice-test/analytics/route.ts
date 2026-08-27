import { NextResponse } from "next/server";
import { getDb } from "@/lib/db/neon";
import { GlobalAnalyticsResponse, PracticeTestLength } from "@/lib/practice-test/analytics-types";

export const revalidate = 60;

export async function GET() {
  const sql = getDb();

  if (!sql) {
    const fallback: GlobalAnalyticsResponse = {
      totalAttempts: 0,
      averageScore: 0,
      averagePercentage: 0,
      passRate: 0,
      byLength: {},
      offline: true,
    };
    return NextResponse.json(fallback, { status: 200 });
  }

  try {
    const result = await sql`
      SELECT
        COUNT(*)::int AS total_attempts,
        ROUND(AVG(score), 1)::float AS avg_score,
        ROUND(AVG(percentage), 1)::float AS avg_percentage,
        ROUND(COUNT(*) FILTER (WHERE percentage >= 80.0) * 100.0 / NULLIF(COUNT(*), 0), 1)::float AS pass_rate
      FROM practice_exam_attempts;
    `;

    if (result && result.length > 0) {
      const row = result[0];
      const byLength: GlobalAnalyticsResponse["byLength"] = {};
      try {
        const grouped = await sql`
          SELECT test_length, COUNT(*)::int AS total_attempts,
            ROUND(AVG(score), 1)::float AS avg_score,
            ROUND(AVG(percentage), 1)::float AS avg_percentage,
            ROUND(COUNT(*) FILTER (WHERE percentage >= 80.0) * 100.0 / NULLIF(COUNT(*), 0), 1)::float AS pass_rate
          FROM practice_exam_attempts
          WHERE test_length IN (60, 100, 150)
          GROUP BY test_length;
        `;
        for (const groupedRow of grouped) {
          const length = Number(groupedRow.test_length) as PracticeTestLength;
          byLength[length] = {
            totalAttempts: Number(groupedRow.total_attempts || 0),
            averageScore: Number(groupedRow.avg_score || 0),
            averagePercentage: Number(groupedRow.avg_percentage || 0),
            passRate: Number(groupedRow.pass_rate || 0),
          };
        }
      } catch (groupedError) {
        // Keep aggregate analytics available while older databases finish the schema migration.
        console.warn("Length-specific analytics query failed:", groupedError);
      }
      const data: GlobalAnalyticsResponse = {
        totalAttempts: Number(row.total_attempts || 0),
        averageScore: Number(row.avg_score || 0),
        averagePercentage: Number(row.avg_percentage || 0),
        passRate: Number(row.pass_rate || 0),
        byLength,
      };

      return NextResponse.json(data, {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      });
    }

    const emptyData: GlobalAnalyticsResponse = {
      totalAttempts: 0,
      averageScore: 0,
      averagePercentage: 0,
      passRate: 0,
      byLength: {},
    };
    return NextResponse.json(emptyData, { status: 200 });
  } catch (dbError) {
    console.warn("Database query failed in /api/practice-test/analytics:", dbError);
    const fallback: GlobalAnalyticsResponse = {
      totalAttempts: 0,
      averageScore: 0,
      averagePercentage: 0,
      passRate: 0,
      offline: true,
    };
    return NextResponse.json(fallback, { status: 200 });
  }
}
