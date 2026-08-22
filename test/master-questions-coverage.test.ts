import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { MASTER_QUESTIONS } from "../lib/practice-test/questions";
import { MASTER_ACTIVITIES } from "../lib/practice-test/registry";
import { generatePracticeTest } from "../lib/practice-test/generator";
import { ModuleId } from "../lib/practice-test/types";

describe("Master Questions Coverage & Quality", () => {
  const ALL_MODULE_IDS: ModuleId[] = [
    "osi-model",
    "networking-tools",
    "modem-router",
    "eia-tia-standard",
    "bits-nibbles-bytes",
    "binary-calculation",
    "communication-types",
    "network-topologies",
    "802.3-ethernet-standards",
    "patch-vs-crossover-cables",
    "cable-ratings",
    "esd-emi-emp",
    "wireless-802-11",
    "802.11-wireless-standards",
    "wired-vs-wireless",
    "wan-technologies",
    "data-link-layer",
    "hexadecimal",
    "layer-2-switches",
    "network-layer-ip-addresses",
    "private-ip-classes",
    "ip-address-classes",
  ];

  it("should verify master questions and activities are defined and populated", () => {
    assert.ok(MASTER_QUESTIONS.length > 0);
    assert.ok(MASTER_ACTIVITIES.length > 0);
  });

  it("should have unique question IDs across all master questions", () => {
    const seenIds = new Set<string>();
    for (const q of MASTER_QUESTIONS) {
      assert.ok(!seenIds.has(q.id), `Duplicate question ID detected: ${q.id}`);
      seenIds.add(q.id);
    }
  });

  it("should cover every single study quiz module", () => {
    const coveredModules = new Set(MASTER_QUESTIONS.map((q) => q.moduleId));
    for (const modId of ALL_MODULE_IDS) {
      assert.ok(
        coveredModules.has(modId),
        `Module "${modId}" is missing from MASTER_QUESTIONS`
      );
      const count = MASTER_QUESTIONS.filter((q) => q.moduleId === modId).length;
      assert.ok(count >= 2, `Module "${modId}" should have at least 2 questions (found ${count})`);
    }
  });

  it("should have complete and valid primary and alternate representations for each question", () => {
    for (const q of MASTER_QUESTIONS) {
      assert.ok(q.id.trim().length > 0, `Question missing ID`);
      assert.ok(q.moduleId.trim().length > 0, `Question ${q.id} missing moduleId`);
      assert.ok(q.moduleName.trim().length > 0, `Question ${q.id} missing moduleName`);
      assert.ok(q.category.trim().length > 0, `Question ${q.id} missing category`);

      // Primary validation
      assert.ok(q.primary.prompt.trim().length > 0, `Question ${q.id} missing primary prompt`);
      assert.ok(q.primary.options.length >= 2, `Question ${q.id} primary options < 2`);
      assert.ok(
        q.primary.options.includes(q.primary.answer),
        `Question ${q.id} primary answer "${q.primary.answer}" not in options: ${JSON.stringify(q.primary.options)}`
      );
      assert.ok(q.primary.explanation.trim().length > 0, `Question ${q.id} missing primary explanation`);
      assert.strictEqual(typeof q.primary.canTypeInHardMode, "boolean");

      // Alternate validation
      assert.ok(q.alternate.prompt.trim().length > 0, `Question ${q.id} missing alternate prompt`);
      assert.ok(q.alternate.options.length >= 2, `Question ${q.id} alternate options < 2`);
      assert.ok(
        q.alternate.options.includes(q.alternate.answer),
        `Question ${q.id} alternate answer "${q.alternate.answer}" not in options: ${JSON.stringify(q.alternate.options)}`
      );
      assert.ok(q.alternate.explanation.trim().length > 0, `Question ${q.id} missing alternate explanation`);
      assert.strictEqual(typeof q.alternate.canTypeInHardMode, "boolean");

      // Primary and alternate prompts should provide distinct phrasing
      assert.notStrictEqual(
        q.primary.prompt,
        q.alternate.prompt,
        `Question ${q.id} has identical primary and alternate prompts`
      );
    }
  });

  it("should generate a practice test without errors using the expanded question pool", () => {
    const test1 = generatePracticeTest();
    assert.ok(test1.length > 0);
    const questions = test1.filter((item) => item.type === "question");
    assert.ok(questions.length > 0);

    const test2 = generatePracticeTest();
    assert.ok(test2.length > 0);
  });
});
