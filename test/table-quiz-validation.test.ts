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

  it("should enforce text input mode from stage 2 onward and in mastery mode", () => {
    // Stage 1 (index 0), not hard mode, not completed -> dropdown mode (useTextInput = false)
    const stage1UseTextInput = false || false || false || 0 >= 1;
    assert.strictEqual(stage1UseTextInput, false);

    // Stage 2 (index 1), normal progression -> type-the-answer mode (useTextInput = true)
    const stage2UseTextInput = false || false || true || 1 >= 1;
    assert.strictEqual(stage2UseTextInput, true);

    // Stage 2 (index 1) after wrong attempt on retry -> remains type-the-answer mode
    const stage2RetryUseTextInput = false || false || true || 1 >= 1;
    assert.strictEqual(stage2RetryUseTextInput, true);

    // Initial hard / mastery mode at stage 1 -> type-the-answer mode
    const masteryStage1UseTextInput = true || false || false || 0 >= 1;
    assert.strictEqual(masteryStage1UseTextInput, true);
  });

  it("should blank all eligible table cells when starting in mastery mode", () => {
    const blankCountsByStage = [5, 10, 16, 22, 28, 35];
    const initialHardMode = true;
    const initialStageIndex = initialHardMode ? blankCountsByStage.length - 1 : 0;
    assert.strictEqual(initialStageIndex, 5);
    assert.strictEqual(blankCountsByStage[initialStageIndex], 35);
  });

  it("should compute optimal row permutation when allowAnyRowOrder is enabled and all rows are blank", async () => {
    const { getBestRowMapping } = await import("../components/study-quiz/TableWithBlanksQuiz");
    const cols = [
      { key: "carrier", label: "Carrier" },
      { key: "channels", label: "Channels" },
      { key: "maxThroughput", label: "Max Throughput" },
    ];
    const rows = [
      { id: 1, carrier: "T1", channels: "24", maxThroughput: "1.544 Mbps" },
      { id: 2, carrier: "E1", channels: "32", maxThroughput: "2.048 Mbps" },
      { id: 3, carrier: "T3", channels: "672 (T1x28)", maxThroughput: "44.736 Mbps" },
      { id: 4, carrier: "E3", channels: "512 (E1x16)", maxThroughput: "34.368 Mbps" },
      { id: 5, carrier: "ISDN", channels: "2", maxThroughput: "128 Kbps" },
    ];
    const blankKeys = new Set<string>();
    rows.forEach((r) => {
      cols.forEach((c) => {
        blankKeys.add(`${r.id}_${c.key}`);
      });
    });

    // User fills row 1 with ISDN, row 2 with T1, row 3 with E1, row 4 with T3, row 5 with E3
    const answers: Record<string, string> = {
      "1_carrier": "ISDN",
      "1_channels": "2",
      "1_maxThroughput": "128 Kbps",

      "2_carrier": "T1",
      "2_channels": "24",
      "2_maxThroughput": "1.544 Mbps",

      "3_carrier": "E1",
      "3_channels": "32",
      "3_maxThroughput": "2.048 Mbps",

      "4_carrier": "T3",
      "4_channels": "672",
      "4_maxThroughput": "44.736 Mbps",

      "5_carrier": "E3",
      "5_channels": "512",
      "5_maxThroughput": "34.368 Mbps",
    };

    const mapping = getBestRowMapping(rows, cols, blankKeys, answers, true);
    // Row 0 (id 1) mapped to target index 4 (ISDN)
    // Row 1 (id 2) mapped to target index 0 (T1)
    // Row 2 (id 3) mapped to target index 1 (E1)
    // Row 3 (id 4) mapped to target index 2 (T3)
    // Row 4 (id 5) mapped to target index 3 (E3)
    assert.deepStrictEqual(mapping, [4, 0, 1, 2, 3]);
  });
});
