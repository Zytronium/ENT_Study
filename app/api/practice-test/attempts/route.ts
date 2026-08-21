import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/neon";
import { ExamSubmissionPayload } from "@/lib/practice-test/analytics-types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ExamSubmissionPayload>;
    const { score, totalPoints } = body;

    if (
      typeof score !== "number" ||
      isNaN(score) ||
      !Number.isFinite(score) ||
      typeof totalPoints !== "number" ||
      isNaN(totalPoints) ||
      !Number.isFinite(totalPoints) ||
      score < 0 ||
      totalPoints <= 0 ||
      score > totalPoints
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid score or totalPoints payload. Must satisfy 0 <= score <= totalPoints and totalPoints > 0.",
        },
        { status: 400 }
      );
    }

    const percentage = Number(((score / totalPoints) * 100).toFixed(2));
    const sql = getDb();

    if (!sql) {
      return NextResponse.json(
        {
          success: true,
          offline: true,
          attempt: { score, totalPoints, percentage },
          message: "Database connection not configured. Evaluated locally.",
        },
        { status: 200 }
      );
    }

    try {
      const result = await sql`
        WITH inserted AS (
          INSERT INTO practice_exam_attempts (score, total_points, percentage)
          VALUES (${score}, ${totalPoints}, ${percentage})
          RETURNING id, percentage
        ),
        stats AS (
          SELECT
            COUNT(*) AS total_count,
            COUNT(*) FILTER (WHERE percentage < (SELECT percentage FROM inserted)) AS lower_count,
            ROUND(AVG(percentage), 1) AS avg_percentage,
            ROUND(COUNT(*) FILTER (WHERE percentage >= 80.0) * 100.0 / NULLIF(COUNT(*), 0), 1) AS pass_rate
          FROM practice_exam_attempts
        )
        SELECT
          (SELECT id FROM inserted) AS attempt_id,
          stats.total_count,
          stats.avg_percentage,
          stats.pass_rate,
          CASE 
            WHEN stats.total_count <= 1 THEN 100.0
            ELSE ROUND((stats.lower_count::numeric / (stats.total_count - 1)::numeric) * 100.0, 1)
          END AS percentile
        FROM stats;
      `;

      if (result && result.length > 0) {
        const row = result[0];
        return NextResponse.json(
          {
            success: true,
            attempt: {
              score,
              totalPoints,
              percentage,
            },
            percentile: Number(row.percentile ?? 100),
            stats: {
              totalAttempts: Number(row.total_count ?? 1),
              averagePercentage: Number(row.avg_percentage ?? percentage),
              passRate: Number(row.pass_rate ?? (percentage >= 80 ? 100 : 0)),
            },
          },
          { status: 201 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          attempt: { score, totalPoints, percentage },
          percentile: 100,
        },
        { status: 201 }
      );
    } catch (dbError) {
      console.warn("Database operation failed in /api/practice-test/attempts:", dbError);
      return NextResponse.json(
        {
          success: true,
          offline: true,
          attempt: { score, totalPoints, percentage },
          message: "Database query failed. Evaluated locally.",
        },
        { status: 200 }
      );
    }
  } catch {
    return NextResponse.json(
      { success: false, error: "Malformed request payload" },
      { status: 400 }
    );
  }
}
