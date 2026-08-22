import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { checkCellCorrect, isCellEligible } from "../components/practice-test/ReusableTableQuiz";
import { generatePracticeTest, generateBlankKeysForTable } from "../lib/practice-test/generator";
import { MASTER_ACTIVITIES } from "../lib/practice-test/registry";
import { MasterTableActivity } from "../lib/practice-test/types";

describe("Reusable Table Quiz Validation & Consistency", () => {
  it("should accept channel aliases like '512' for '512 (E1x16)' and '672' for '672 (T1x28)'", () => {
    assert.strictEqual(checkCellCorrect("512 (E1x16)", "512", "channels"), true);
    assert.strictEqual(checkCellCorrect("512 (E1x16)", "512 channels", "channels"), true);
    assert.strictEqual(checkCellCorrect("512 (E1x16)", "512 (e1x16)", "channels"), true);
    assert.strictEqual(checkCellCorrect("512 (E1x16)", "e1x16", "channels"), true);
    assert.strictEqual(checkCellCorrect("512 (E1x16)", "16 e1", "channels"), true);

    assert.strictEqual(checkCellCorrect("672 (T1x28)", "672", "channels"), true);
    assert.strictEqual(checkCellCorrect("672 (T1x28)", "672 channels", "channels"), true);
    assert.strictEqual(checkCellCorrect("672 (T1x28)", "t1x28", "channels"), true);
    assert.strictEqual(checkCellCorrect("672 (T1x28)", "28 t1", "channels"), true);

    assert.strictEqual(checkCellCorrect("24", "24 channels", "channels"), true);
    assert.strictEqual(checkCellCorrect("32", "32", "channels"), true);
    assert.strictEqual(checkCellCorrect("2", "two", "channels"), true);
  });

  it("should accept throughput variations for WAN carriers", () => {
    assert.strictEqual(checkCellCorrect("1.544 Mbps", "1.544mbps", "maxThroughput"), true);
    assert.strictEqual(checkCellCorrect("1.544 Mbps", "1.544 mb/s", "maxThroughput"), true);
    assert.strictEqual(checkCellCorrect("1.544 Mbps", "1.544", "maxThroughput"), true);
    assert.strictEqual(checkCellCorrect("44.736 Mbps", "44.736", "maxThroughput"), true);
    assert.strictEqual(checkCellCorrect("128 Kbps", "128kbps", "maxThroughput"), true);
  });

  it("should validate IPv4 address class table cells accurately", () => {
    assert.strictEqual(checkCellCorrect("Class A", "A", "ipClass"), true);
    assert.strictEqual(checkCellCorrect("Class A", "class a", "ipClass"), true);
    assert.strictEqual(checkCellCorrect("1-126 (or 127)", "1-126", "networkNumber"), true);
    assert.strictEqual(checkCellCorrect("1-126 (or 127)", "1-127", "networkNumber"), true);
    assert.strictEqual(checkCellCorrect("1-126 (or 127)", "1-126 (or 127)", "networkNumber"), true);
    assert.strictEqual(checkCellCorrect("128-191", "128-191", "networkNumber"), true);
    assert.strictEqual(checkCellCorrect("N.H.H.H", "N.H.H.H", "netHost"), true);
    assert.strictEqual(checkCellCorrect("N.H.H.H", "nhhh", "netHost"), true);
    assert.strictEqual(checkCellCorrect("255.0.0.0", "255.0.0.0", "subnetMask"), true);
    assert.strictEqual(checkCellCorrect("128 (126)", "128(126)", "possibleNetworks"), true);
    assert.strictEqual(checkCellCorrect("16,777,214", "16777214", "possibleHosts"), true);
  });

  it("should correctly identify non-blankable / non-eligible cells", () => {
    assert.strictEqual(isCellEligible("-"), false);
    assert.strictEqual(isCellEligible("—"), false);
    assert.strictEqual(isCellEligible("N/A"), false);
    assert.strictEqual(isCellEligible(""), false);
    assert.strictEqual(isCellEligible(null), false);
    assert.strictEqual(isCellEligible("Class A"), true);
    assert.strictEqual(isCellEligible("255.255.255.0"), true);
  });

  it("should generate deterministic blank keys for each table activity in generatePracticeTest", () => {
    const tableActivities = MASTER_ACTIVITIES.filter((a) => a.type === "table") as MasterTableActivity[];
    assert.ok(tableActivities.length > 0);

    for (const act of tableActivities) {
      const blanks = generateBlankKeysForTable(act);
      assert.ok(Array.isArray(blanks));
      assert.ok(blanks.length > 0);

      // Verify each generated blank key corresponds to an eligible cell
      for (const key of blanks) {
        const [rowId, ...colParts] = key.split("_");
        const colKey = colParts.join("_");
        const row = act.rows.find((r) => String(r.id) === rowId);
        assert.ok(row, `Row with id ${rowId} must exist`);
        assert.ok(isCellEligible(row[colKey]), `Cell ${key} must be eligible`);
      }
    }

    const testItems = generatePracticeTest();
    const tableItems = testItems.filter((item) => item.type === "activity" && item.activity.type === "table");
    for (const tItem of tableItems) {
      if (tItem.type === "activity") {
        assert.ok(Array.isArray(tItem.blankCellKeys), "blankCellKeys must be defined on table activity item");
        assert.ok(tItem.blankCellKeys!.length > 0, "blankCellKeys must not be empty");
      }
    }
  });
});
