import assert from "node:assert/strict";

function calculatePercentile(previousScores: number[], newScore: number): number {
  if (previousScores.length === 0) {
    return 100.0;
  }
  const lowerCount = previousScores.filter((s) => s < newScore).length;
  return Number(((lowerCount / previousScores.length) * 100).toFixed(1));
}

function calculateGlobalStats(previousScores: number[], newScore: number) {
  const allScores = [...previousScores, newScore];
  const totalAttempts = allScores.length;
  const averagePercentage = Number(
    (allScores.reduce((sum, s) => sum + s, 0) / totalAttempts).toFixed(1)
  );
  const passRate = Number(
    ((allScores.filter((s) => s >= 80.0).length / totalAttempts) * 100).toFixed(1)
  );
  return { totalAttempts, averagePercentage, passRate };
}

function runPercentileTests() {
  console.log("Running percentile calculation tests...");

  // Scenario 1: First attempt (no previous scores)
  assert.equal(calculatePercentile([], 83.33), 100.0);
  {
    const global = calculateGlobalStats([], 83.33);
    assert.equal(global.totalAttempts, 1);
    assert.equal(global.averagePercentage, 83.3);
    assert.equal(global.passRate, 100.0);
  }

  // Scenario 2: Multiple previous attempts (30, 50, 70, 90) + new score of 80
  // Lower scores among previous attempts: 30, 50, 70 (3 out of 4) -> (3 / 4) * 100 = 75.0%
  assert.equal(calculatePercentile([30, 50, 70, 90], 80), 75.0);
  {
    const global = calculateGlobalStats([30, 50, 70, 90], 80);
    assert.equal(global.totalAttempts, 5);
    assert.equal(global.averagePercentage, 64.0);
    assert.equal(global.passRate, 40.0); // 90 and 80 pass
  }

  // Scenario 3: Lowest score compared to previous attempts
  assert.equal(calculatePercentile([50, 60, 70], 40), 0.0);

  // Scenario 4: Highest score compared to previous attempts
  assert.equal(calculatePercentile([50, 60, 70], 80), 100.0);

  // Scenario 5: User is in top 33% out of 3 previous recorded attempts (4 total attempts)
  // 3 previous scores [50, 60, 70], new score 65 -> lower count is 2 (50, 60) -> (2 / 3) * 100 = 66.7%
  // Top % = 100 - 66.7 = 33.3 -> 33%
  assert.equal(calculatePercentile([50, 60, 70], 65), 66.7);
  {
    const global = calculateGlobalStats([50, 60, 70], 65);
    assert.equal(global.totalAttempts, 4); // 4 recorded attempts in total
    assert.equal(global.averagePercentage, 61.3);
    assert.equal(global.passRate, 0.0);
  }

  // Scenario 6: Tied score with one of the previous scores
  // [50, 60, 70] + new score 60 -> lower count is 1 (score 50) -> (1 / 3) * 100 = 33.3%
  assert.equal(calculatePercentile([50, 60, 70], 60), 33.3);

  console.log("All percentile calculation tests passed!");
}

runPercentileTests();
