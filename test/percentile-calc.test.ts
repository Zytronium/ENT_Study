import assert from "node:assert/strict";

function calculatePercentile(scores: number[], newScore: number): number {
  const allScores = [...scores, newScore];
  const totalCount = allScores.length;
  if (totalCount <= 1) {
    return 100.0;
  }
  const lowerCount = allScores.filter((s) => s < newScore).length;
  return Number(((lowerCount / (totalCount - 1)) * 100).toFixed(1));
}

function runPercentileTests() {
  console.log("Running percentile calculation tests...");

  // Scenario 1: First attempt
  assert.equal(calculatePercentile([], 83.33), 100.0);

  // Scenario 2: Multiple attempts (30, 50, 70, 90) + new score of 80
  // Lower scores are 30, 50, 70 (3 scores out of 4 previous) -> (3 / 4) * 100 = 75.0%
  assert.equal(calculatePercentile([30, 50, 70, 90], 80), 75.0);

  // Scenario 3: Lowest score
  assert.equal(calculatePercentile([50, 60, 70], 40), 0.0);

  // Scenario 4: Highest score
  assert.equal(calculatePercentile([50, 60, 70], 80), 100.0);

  // Scenario 5: Tied score
  // [50, 60, 70] + new score 60 -> lower count is 1 (score 50) -> (1 / 3) * 100 = 33.3%
  assert.equal(calculatePercentile([50, 60, 70], 60), 33.3);

  console.log("All percentile calculation tests passed!");
}

runPercentileTests();
