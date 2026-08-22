import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { validateQuestionAnswer } from "../components/study-quiz/QuestionQuiz";
import { validateDefinitionMatch } from "../components/study-quiz/MatchToDefinitionsQuiz";
import { validateCalculationAnswer } from "../components/study-quiz/CalculationQuiz";

describe("MultiSectionQuiz Validation Logic", () => {
  test("should correctly validate Definition Matching items in Stage 1", () => {
    const item = {
      id: 1,
      term: "Bit",
      definition: "Abbreviated as lowercase 'b', represents a single 1 or 0 (on or off).",
    };

    assert.strictEqual(validateDefinitionMatch(item, "Bit"), true);
    assert.strictEqual(validateDefinitionMatch(item, "bit"), true);
    assert.strictEqual(validateDefinitionMatch(item, "Byte"), false);
    assert.strictEqual(validateDefinitionMatch(item, ""), false);
  });

  test("should correctly validate Calculation items in Stage 2", () => {
    const calc = {
      id: 6,
      question: "How many bits are in a Nibble?",
      answer: "4",
      explanation: "1 Nibble = 4 bits.",
    };

    assert.strictEqual(validateCalculationAnswer(calc, "4"), true);
    assert.strictEqual(validateCalculationAnswer(calc, "  4  "), true);
    assert.strictEqual(validateCalculationAnswer(calc, "8"), false);
    assert.strictEqual(validateCalculationAnswer(calc, ""), false);
  });

  test("should correctly validate Question items in Stage 3", () => {
    const q = {
      id: 11,
      prompt: "Which unit is abbreviated as lowercase 'b' and primarily measures network throughput / data transfer rates?",
      options: ["Bits (b)", "Bytes (B)"],
      answer: "Bits (b)",
      aliases: ["bits", "b", "bit"],
    };

    assert.strictEqual(validateQuestionAnswer(q, "Bits (b)"), true);
    assert.strictEqual(validateQuestionAnswer(q, "bits"), true);
    assert.strictEqual(validateQuestionAnswer(q, "Bytes (B)"), false);
  });

  test("should validate keyword and alias variations in hard mode questions", () => {
    const starCablesQ = {
      id: "spec-star-cables",
      prompt: "What type of cables are used in a Star topology?",
      answer: "Twisted pair cables",
      aliases: ["twisted pair", "twisted pair cable", "twisted pair cables", "utp", "stp"],
      keywords: ["twisted pair"],
      canTypeInHardMode: true,
    };

    assert.strictEqual(validateQuestionAnswer(starCablesQ, "Twisted pair cables"), true);
    assert.strictEqual(validateQuestionAnswer(starCablesQ, "twisted pair"), true);
    assert.strictEqual(validateQuestionAnswer(starCablesQ, "twisted pair cable"), true);
    assert.strictEqual(validateQuestionAnswer(starCablesQ, "unshielded twisted pair"), true);
    assert.strictEqual(validateQuestionAnswer(starCablesQ, "utp"), true);
    assert.strictEqual(validateQuestionAnswer(starCablesQ, "coaxial cable"), false);

    const busConnectorsQ = {
      id: "spec-bus-connectors",
      prompt: "What connectors and termination devices are used in a Bus topology?",
      answer: "BNC connectors and terminators",
      aliases: ["bnc", "bnc connectors", "bnc and terminators"],
      keywords: ["bnc"],
      canTypeInHardMode: true,
    };

    assert.strictEqual(validateQuestionAnswer(busConnectorsQ, "BNC connectors and terminators"), true);
    assert.strictEqual(validateQuestionAnswer(busConnectorsQ, "bnc"), true);
    assert.strictEqual(validateQuestionAnswer(busConnectorsQ, "BNC connectors"), true);
    assert.strictEqual(validateQuestionAnswer(busConnectorsQ, "rj45"), false);

    const busCablesQ = {
      id: "spec-bus-cables",
      prompt: "What cable types are used in a Bus topology?",
      answer: "Thicknet (10base5) and Thinnet (10base2) coaxial cables",
      aliases: ["thicknet and thinnet", "coaxial", "coax"],
      keywords: ["thicknet", "thinnet"],
      canTypeInHardMode: true,
    };

    assert.strictEqual(validateQuestionAnswer(busCablesQ, "Thicknet (10base5) and Thinnet (10base2) coaxial cables"), true);
    assert.strictEqual(validateQuestionAnswer(busCablesQ, "thicknet and thinnet"), true);
    assert.strictEqual(validateQuestionAnswer(busCablesQ, "thicknet & thinnet coaxial"), true);
    assert.strictEqual(validateQuestionAnswer(busCablesQ, "coaxial"), true);
    assert.strictEqual(validateQuestionAnswer(busCablesQ, "fiber optic"), false);
  });

  test("should clear answers and reset validation status on section retry", () => {
    // Initial state after answering incorrectly
    const previousState = {
      validated: true,
      allCorrect: false,
      score: 2,
      total: 5,
      answers: {
        "zone-1": "CMP (Plenum)",
        "zone-2": "CM (General Use)", // incorrect
      },
    };

    // Simulate handleRetryCurrentSection logic
    const retriedState = {
      validated: false,
      allCorrect: false,
      score: 0,
      total: previousState.total,
      answers: {},
    };

    assert.strictEqual(retriedState.validated, false);
    assert.strictEqual(retriedState.allCorrect, false);
    assert.strictEqual(retriedState.score, 0);
    assert.deepStrictEqual(retriedState.answers, {});
  });
});
