import assert from "node:assert/strict";
import { POST as handleAttemptsPost } from "../app/api/practice-test/attempts/route";
import { GET as handleAnalyticsGet } from "../app/api/practice-test/analytics/route";
import { GET as handleSpeedrunGet, POST as handleSpeedrunPost } from "../app/api/practice-test/speedrun/route";
import { NextRequest } from "next/server";

async function runTests() {
  console.log("Running API route tests...");

  // 1. Test POST with invalid payload: negative score
  {
    const req = new NextRequest("http://localhost:3000/api/practice-test/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score: -5, totalPoints: 60 }),
    });
    const res = await handleAttemptsPost(req);
    assert.equal(res.status, 400, "Should return 400 for negative score");
    const data = await res.json();
    assert.equal(data.success, false);
  }

  // 2. Test POST with invalid payload: score > totalPoints
  {
    const req = new NextRequest("http://localhost:3000/api/practice-test/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score: 65, totalPoints: 60 }),
    });
    const res = await handleAttemptsPost(req);
    assert.equal(res.status, 400, "Should return 400 when score exceeds totalPoints");
    const data = await res.json();
    assert.equal(data.success, false);
  }

  // 3. Test POST with invalid payload: non-numeric
  {
    const req = new NextRequest("http://localhost:3000/api/practice-test/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score: "abc", totalPoints: 60 }),
    });
    const res = await handleAttemptsPost(req);
    assert.equal(res.status, 400, "Should return 400 for non-numeric score");
  }

  // 4. Test POST with valid payload (offline fallback test)
  {
    const req = new NextRequest("http://localhost:3000/api/practice-test/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score: 48, totalPoints: 60 }),
    });
    const res = await handleAttemptsPost(req);
    assert.equal(res.status, 200, "Should return 200 fallback when DB is offline");
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.attempt.score, 48);
    assert.equal(data.attempt.percentage, 80);
    assert.equal(data.offline, true);
  }

  // 5. Test GET analytics (offline fallback test)
  {
    const res = await handleAnalyticsGet();
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(typeof data.totalAttempts, "number");
    assert.equal(typeof data.averagePercentage, "number");
  }

  // 6. Speedrun rejects invalid identity and score payloads
  {
    const req = new NextRequest("http://localhost:3000/api/practice-test/speedrun", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName: "", score: 10001, elapsedMs: -1 }),
    });
    const res = await handleSpeedrunPost(req);
    assert.equal(res.status, 400);
  }

  // 7. Speedrun accepts a valid payload when the database is offline
  {
    const req = new NextRequest("http://localhost:3000/api/practice-test/speedrun", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName: "NetRunner", score: 8500, elapsedMs: 42000 }),
    });
    const res = await handleSpeedrunPost(req);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.entry.score, 8500);
    assert.equal(data.entry.totalPoints, 10000);
  }

  // 8. Speedrun leaderboard has a stable response shape offline
  {
    const res = await handleSpeedrunGet();
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data.leaderboard));
  }

  console.log("All API route tests passed successfully!");
}

runTests().catch((err) => {
  console.error("Test failure:", err);
  process.exit(1);
});
