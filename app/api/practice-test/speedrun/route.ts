import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/neon";

const MAX_SCORE = 10000;
const MAX_ELAPSED_MS = 900000;

function leaderboardFallback() {
  return NextResponse.json({ success: true, offline: true, leaderboard: [] });
}

export async function GET() {
  const sql = getDb();
  if (!sql) return leaderboardFallback();

  try {
    const rows = await sql`
      SELECT display_name, score, total_points, elapsed_ms, created_at
      FROM practice_speedrun_scores
      ORDER BY score DESC, elapsed_ms ASC, created_at ASC
      LIMIT 10
    `;
    return NextResponse.json({
      success: true,
      leaderboard: rows.map((row, index) => ({
        rank: index + 1,
        displayName: row.display_name,
        score: Number(row.score),
        totalPoints: Number(row.total_points),
        elapsedMs: Number(row.elapsed_ms),
        createdAt: row.created_at,
      })),
    });
  } catch (error) {
    console.warn("Database query failed in /api/practice-test/speedrun:", error);
    return leaderboardFallback();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      displayName?: unknown;
      score?: unknown;
      elapsedMs?: unknown;
    };
    const displayName = typeof body.displayName === "string" ? body.displayName.trim() : "";
    const score = body.score;
    const elapsedMs = body.elapsedMs;

    if (
      displayName.length < 1 || displayName.length > 24 ||
      typeof score !== "number" || !Number.isInteger(score) || score < 0 || score > MAX_SCORE ||
      typeof elapsedMs !== "number" || !Number.isInteger(elapsedMs) || elapsedMs < 0 || elapsedMs > MAX_ELAPSED_MS
    ) {
      return NextResponse.json({ success: false, error: "Invalid speedrun score payload." }, { status: 400 });
    }

    const sql = getDb();
    if (!sql) return NextResponse.json({ success: true, offline: true, entry: { displayName, score, totalPoints: MAX_SCORE, elapsedMs }, leaderboard: [] });

    const result = await sql`
      WITH inserted AS (
        INSERT INTO practice_speedrun_scores (display_name, score, total_points, elapsed_ms)
        VALUES (${displayName}, ${score}, ${MAX_SCORE}, ${elapsedMs})
        RETURNING id
      )
      SELECT id FROM inserted
    `;
    const leaderboardResponse = await GET();
    const leaderboardData = await leaderboardResponse.json();
    return NextResponse.json({
      success: true,
      entry: { id: result[0]?.id, displayName, score, totalPoints: MAX_SCORE, elapsedMs },
      leaderboard: leaderboardData.leaderboard ?? [],
    }, { status: 201 });
  } catch (error) {
    console.warn("Database operation failed in /api/practice-test/speedrun:", error);
    return NextResponse.json({ success: true, offline: true, leaderboard: [] });
  }
}