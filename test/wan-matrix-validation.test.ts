import { describe, it } from "node:test";
import assert from "node:assert/strict";

interface CarrierRow {
  id: number;
  carrier: string;
  channels: string;
  maxThroughput: string;
}

type ColumnKey = "carrier" | "channels" | "maxThroughput";

interface ColumnConfig {
  key: ColumnKey;
  label: string;
}

const columns: ColumnConfig[] = [
  { key: "carrier", label: "Carrier" },
  { key: "channels", label: "64 Kbps Channels" },
  { key: "maxThroughput", label: "Max Throughput" },
];

const carrierRows: CarrierRow[] = [
  { id: 1, carrier: "T1", channels: "24", maxThroughput: "1.544 Mbps" },
  { id: 2, carrier: "E1", channels: "32", maxThroughput: "2.048 Mbps" },
  { id: 3, carrier: "T3", channels: "672 (T1x28)", maxThroughput: "44.736 Mbps" },
  { id: 4, carrier: "E3", channels: "512 (E1x16)", maxThroughput: "34.368 Mbps" },
  { id: 5, carrier: "ISDN", channels: "2", maxThroughput: "128 Kbps" },
];

const PERMUTATIONS_5: number[][] = (function () {
  const result: number[][] = [];
  function permute(arr: number[], m: number[] = []) {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  }
  permute([0, 1, 2, 3, 4]);
  return result;
})();

function isTextAnswerCorrect(colKey: ColumnKey, correct: string, userInput: string): boolean {
  if (!userInput.trim()) return false;

  const cleanInput = userInput.trim().toLowerCase();
  const cleanCorrect = correct.trim().toLowerCase();

  if (colKey === "carrier") {
    return cleanInput === cleanCorrect || cleanInput.replace(/[-_ ]/g, "") === cleanCorrect.replace(/[-_ ]/g, "");
  }

  if (colKey === "channels") {
    if (cleanCorrect.startsWith("672")) {
      return (
        cleanInput === "672" ||
        cleanInput === "672 channels" ||
        cleanInput === "672(t1x28)" ||
        cleanInput === "672 (t1x28)" ||
        cleanInput === "t1x28" ||
        cleanInput === "28 t1" ||
        cleanInput === "28 t1s" ||
        cleanInput === "28 t1 lines"
      );
    }
    if (cleanCorrect.startsWith("512")) {
      return (
        cleanInput === "512" ||
        cleanInput === "512 channels" ||
        cleanInput === "512(e1x16)" ||
        cleanInput === "512 (e1x16)" ||
        cleanInput === "e1x16" ||
        cleanInput === "16 e1" ||
        cleanInput === "16 e1s" ||
        cleanInput === "16 e1 lines"
      );
    }
    return (
      cleanInput === cleanCorrect ||
      cleanInput === `${cleanCorrect} channels` ||
      cleanInput === `${cleanCorrect} ch` ||
      (cleanCorrect === "2" && cleanInput === "two")
    );
  }

  if (colKey === "maxThroughput") {
    const rawNum = correct.split(" ")[0].toLowerCase();
    const rawUnit = (correct.split(" ")[1] || "").toLowerCase();
    const inputWithoutSpaces = cleanInput.replace(/\s+/g, "");

    return (
      cleanInput === cleanCorrect ||
      inputWithoutSpaces === `${rawNum}${rawUnit}` ||
      inputWithoutSpaces === `${rawNum}${rawUnit.replace("bps", "b/s")}` ||
      inputWithoutSpaces === `${rawNum}${rawUnit.replace("bps", "b")}` ||
      inputWithoutSpaces === `${rawNum}${rawUnit[0]}` ||
      cleanInput === rawNum
    );
  }

  return cleanInput === cleanCorrect;
}

function getBestRowMapping(
  tableAnswers: Record<string, string>,
  blankCells: Set<string>,
  useTextInput: boolean
): number[] {
  const scoreMatrix: number[][] = carrierRows.map((row) => {
    return carrierRows.map((targetCarrier) => {
      let score = 0;
      for (const col of columns) {
        const cellKey = `${row.id}_${col.key}`;
        const isBlank = blankCells.has(cellKey);
        const targetVal = targetCarrier[col.key];

        if (!isBlank) {
          const fixedVal = row[col.key];
          if (fixedVal === targetVal) {
            score += 10;
          }
        } else {
          const userVal = tableAnswers[cellKey] || "";
          if (userVal.trim()) {
            const isCorrect = useTextInput
              ? isTextAnswerCorrect(col.key, targetVal, userVal)
              : userVal === targetVal;
            if (isCorrect) {
              score += 1;
            }
          }
        }
      }
      return score;
    });
  });

  let bestPerm = [0, 1, 2, 3, 4];
  let maxScore = -1;
  let maxIdentityMatches = -1;

  for (const perm of PERMUTATIONS_5) {
    let currentScore = 0;
    let identityMatches = 0;
    for (let r = 0; r < 5; r++) {
      currentScore += scoreMatrix[r][perm[r]];
      if (perm[r] === r) {
        identityMatches++;
      }
    }

    if (
      currentScore > maxScore ||
      (currentScore === maxScore && identityMatches > maxIdentityMatches)
    ) {
      maxScore = currentScore;
      maxIdentityMatches = identityMatches;
      bestPerm = perm;
    }
  }

  return bestPerm;
}

function evaluateTable(
  tableAnswers: Record<string, string>,
  blankCells: Set<string>,
  useTextInput: boolean
) {
  const rowMapping = getBestRowMapping(tableAnswers, blankCells, useTextInput);
  let correctBlanks = 0;

  carrierRows.forEach((row, rowIdx) => {
    columns.forEach((col) => {
      const cellKey = `${row.id}_${col.key}`;
      if (blankCells.has(cellKey)) {
        const targetCarrier = carrierRows[rowMapping[rowIdx]];
        const targetVal = targetCarrier[col.key];
        const userVal = tableAnswers[cellKey] || "";
        const isCorrect = useTextInput
          ? isTextAnswerCorrect(col.key, targetVal, userVal)
          : userVal === targetVal;
        if (isCorrect) {
          correctBlanks++;
        }
      }
    });
  });

  return { rowMapping, correctBlanks, totalBlanks: blankCells.size };
}

describe("WAN Carrier Matrix Table Validation", () => {
  it("should validate all correct answers in default row order", () => {
    // All 15 cells blank
    const allBlankKeys = new Set(
      carrierRows.flatMap((r) => columns.map((c) => `${r.id}_${c.key}`))
    );

    const answers: Record<string, string> = {
      "1_carrier": "T1", "1_channels": "24", "1_maxThroughput": "1.544 Mbps",
      "2_carrier": "E1", "2_channels": "32", "2_maxThroughput": "2.048 Mbps",
      "3_carrier": "T3", "3_channels": "672 (T1x28)", "3_maxThroughput": "44.736 Mbps",
      "4_carrier": "E3", "4_channels": "512 (E1x16)", "4_maxThroughput": "34.368 Mbps",
      "5_carrier": "ISDN", "5_channels": "2", "5_maxThroughput": "128 Kbps",
    };

    const res = evaluateTable(answers, allBlankKeys, true);
    assert.equal(res.correctBlanks, 15);
    assert.deepEqual(res.rowMapping, [0, 1, 2, 3, 4]);
  });

  it("should validate all correct answers in any arbitrary row order", () => {
    // All 15 cells blank
    const allBlankKeys = new Set(
      carrierRows.flatMap((r) => columns.map((c) => `${r.id}_${c.key}`))
    );

    // Row 1: ISDN, Row 2: T3, Row 3: E1, Row 4: T1, Row 5: E3
    const answers: Record<string, string> = {
      "1_carrier": "isdn", "1_channels": "2 channels", "1_maxThroughput": "128 kbps",
      "2_carrier": "t3", "2_channels": "672", "2_maxThroughput": "44.736mbps",
      "3_carrier": "e1", "3_channels": "32 channels", "3_maxThroughput": "2.048 mb/s",
      "4_carrier": "t1", "4_channels": "24", "4_maxThroughput": "1.544mbps",
      "5_carrier": "e3", "5_channels": "512 (e1x16)", "5_maxThroughput": "34.368 mbps",
    };

    const res = evaluateTable(answers, allBlankKeys, true);
    assert.equal(res.correctBlanks, 15);
    assert.deepEqual(res.rowMapping, [4, 2, 1, 0, 3]);
  });

  it("should not allow duplicate carriers to count as full accuracy", () => {
    const allBlankKeys = new Set(
      carrierRows.flatMap((r) => columns.map((c) => `${r.id}_${c.key}`))
    );

    // Row 1 and Row 2 both have T1 data, E1 is missing
    const answers: Record<string, string> = {
      "1_carrier": "T1", "1_channels": "24", "1_maxThroughput": "1.544 Mbps",
      "2_carrier": "T1", "2_channels": "24", "2_maxThroughput": "1.544 Mbps",
      "3_carrier": "T3", "3_channels": "672", "3_maxThroughput": "44.736 Mbps",
      "4_carrier": "E3", "4_channels": "512", "4_maxThroughput": "34.368 Mbps",
      "5_carrier": "ISDN", "5_channels": "2", "5_maxThroughput": "128 Kbps",
    };

    const res = evaluateTable(answers, allBlankKeys, true);
    // 4 rows match distinct carriers (4 * 3 = 12 correct cells), 1 row has to map to E1 which has 0 matching cells
    assert.equal(res.correctBlanks, 12);
  });

  it("should respect fixed cells when matching rows", () => {
    // Only 5 blanks, Row 1 has fixed carrier 'T1'
    const blankKeys = new Set(["1_channels", "1_maxThroughput", "2_carrier", "3_channels", "4_maxThroughput"]);

    const answers: Record<string, string> = {
      "1_channels": "24",
      "1_maxThroughput": "1.544 Mbps",
      "2_carrier": "E1",
      "3_channels": "672",
      "4_maxThroughput": "34.368 Mbps",
    };

    const res = evaluateTable(answers, blankKeys, true);
    assert.equal(res.correctBlanks, 5);
    assert.deepEqual(res.rowMapping, [0, 1, 2, 3, 4]);
  });
});
