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
          RETURNING id, score, total_points, percentage
        ),
        prior_stats AS (
          SELECT
            COUNT(*)::int AS prior_count,
            COUNT(*) FILTER (WHERE percentage < ${percentage})::int AS lower_count
          FROM practice_exam_attempts
          WHERE id NOT IN (SELECT id FROM inserted)
        ),
        all_attempts AS (
          SELECT score, total_points, percentage FROM practice_exam_attempts
          WHERE id NOT IN (SELECT id FROM inserted)
          UNION ALL
          SELECT score, total_points, percentage FROM inserted
        ),
        global_stats AS (
          SELECT
            COUNT(*)::int AS total_count,
            ROUND(AVG(score), 1)::float AS avg_score,
            ROUND(AVG(percentage), 1)::float AS avg_percentage,
            ROUND(COUNT(*) FILTER (WHERE percentage >= 80.0) * 100.0 / NULLIF(COUNT(*), 0), 1)::float AS pass_rate
          FROM all_attempts
        )
        SELECT
          (SELECT id FROM inserted) AS attempt_id,
          prior_stats.prior_count,
          prior_stats.lower_count,
          CASE 
            WHEN prior_stats.prior_count = 0 THEN 100.0
            ELSE ROUND((prior_stats.lower_count::numeric / prior_stats.prior_count::numeric) * 100.0, 1)
          END AS percentile,
          global_stats.total_count,
          global_stats.avg_score,
          global_stats.avg_percentage,
          global_stats.pass_rate
        FROM prior_stats, global_stats;
      `;

      if (result && result.length > 0) {
        const row = result[0];
        const priorCount = Number(row.prior_count ?? 0);
        return NextResponse.json(
          {
            success: true,
            attempt: {
              score,
              totalPoints,
              percentage,
            },
            percentile: Number(row.percentile ?? 100),
            previousAttempts: priorCount,
            stats: {
              totalAttempts: Number(row.total_count ?? priorCount + 1),
              averageScore: Number(row.avg_score ?? score),
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
          previousAttempts: 0,
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
