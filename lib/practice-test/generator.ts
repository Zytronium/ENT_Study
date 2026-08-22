import { ActivePracticeItem, MasterTableActivity, ModuleId } from "./types";
import { MASTER_ACTIVITIES, MASTER_QUESTIONS } from "./registry";

export function isCellEligible(val: unknown): boolean {
  if (val === null || val === undefined) return false;
  const str = String(val).trim();
  return (
    str !== "" &&
    str !== "-" &&
    str !== "—" &&
    str !== "N/A" &&
    str !== "n/a" &&
    str !== "NA" &&
    str !== "na"
  );
}

export function generateBlankKeysForTable(act: MasterTableActivity): string[] {
  const eligibleKeys: string[] = [];
  act.rows.forEach((row) => {
    act.columns.forEach((col) => {
      const val = row[col.key];
      if (isCellEligible(val)) {
        eligibleKeys.push(`${row.id}_${col.key}`);
      }
    });
  });
  const targetCount = Math.max(1, Math.round(eligibleKeys.length * (2 / 3)));
  const shuffled = shuffle(eligibleKeys);
  return shuffled.slice(0, targetCount);
}

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export interface PracticeTestOptions {
  totalTargetPoints?: number;
  maxPerModule?: number;
  activityCount?: number;
}

export function generatePracticeTest(options?: PracticeTestOptions): ActivePracticeItem[] {
  const targetPoints = options?.totalTargetPoints ?? 60;
  const maxPerModule = options?.maxPerModule ?? 12;

  // Decide how many activities to include: at least 1 (e.g. 1 or 2)
  const numActivities = options?.activityCount ?? (Math.random() < 0.35 ? 2 : 1);

  const selectedItems: ActivePracticeItem[] = [];
  const modulePoints: Record<string, number> = {};

  const getPoints = (modId: ModuleId) => modulePoints[modId] || 0;
  const addPoints = (modId: ModuleId, pts: number) => {
    modulePoints[modId] = getPoints(modId) + pts;
  };

  // 1. Pick activities (each activity counts as 10 points)
  const shuffledActivities = shuffle(MASTER_ACTIVITIES);
  let currentPoints = 0;

  for (const act of shuffledActivities) {
    if (selectedItems.filter((item) => item.type === "activity").length >= numActivities) {
      break;
    }
    if (currentPoints + 10 > targetPoints) {
      break;
    }
    if (getPoints(act.moduleId) + 10 <= maxPerModule) {
      addPoints(act.moduleId, 10);
      currentPoints += 10;
      selectedItems.push({
        type: "activity",
        id: act.id,
        moduleId: act.moduleId,
        moduleName: act.moduleName,
        activity: act,
        blankCellKeys: act.type === "table" ? generateBlankKeysForTable(act as MasterTableActivity) : undefined,
        points: 10,
      });
    }
  }

  // Fallback: If no activity was selected for some reason, force pick at least one
  if (selectedItems.filter((item) => item.type === "activity").length === 0 && shuffledActivities.length > 0) {
    const act = shuffledActivities[0];
    addPoints(act.moduleId, 10);
    currentPoints += 10;
    selectedItems.push({
      type: "activity",
      id: act.id,
      moduleId: act.moduleId,
      moduleName: act.moduleName,
      activity: act,
      blankCellKeys: act.type === "table" ? generateBlankKeysForTable(act as MasterTableActivity) : undefined,
      points: 10,
    });
  }

  // 2. Pick standalone questions to fill up to targetPoints (each question counts as 2 points)
  // Shuffle all questions
  const shuffledQuestions = shuffle(MASTER_QUESTIONS);
  const usedQuestionIds = new Set<string>();

  // First pass: select questions respecting maxPerModule cap
  for (const q of shuffledQuestions) {
    if (currentPoints >= targetPoints) break;
    if (usedQuestionIds.has(q.id)) continue;

    if (getPoints(q.moduleId) + 2 <= maxPerModule) {
      usedQuestionIds.add(q.id);
      addPoints(q.moduleId, 2);
      currentPoints += 2;

      // Randomly choose primary or alternate wording
      const pickAlternate = Math.random() < 0.5;
      const wording = pickAlternate ? q.alternate : q.primary;
      const wordingType = pickAlternate ? "alternate" : "primary";

      selectedItems.push({
        type: "question",
        id: q.id,
        moduleId: q.moduleId,
        moduleName: q.moduleName,
        category: q.category,
        wordingType,
        prompt: wording.prompt,
        options: shuffle(wording.options),
        answer: wording.answer,
        explanation: wording.explanation,
        aliases: wording.aliases,
        keywords: wording.keywords,
        canTypeInHardMode: wording.canTypeInHardMode,
        points: 2,
      });
    }
  }

  // Second pass: if still short of targetPoints (e.g. strict cap), relax slightly
  if (currentPoints < targetPoints) {
    for (const q of shuffledQuestions) {
      if (currentPoints >= targetPoints) break;
      if (usedQuestionIds.has(q.id)) continue;

      usedQuestionIds.add(q.id);
      addPoints(q.moduleId, 2);
      currentPoints += 2;

      const pickAlternate = Math.random() < 0.5;
      const wording = pickAlternate ? q.alternate : q.primary;
      const wordingType = pickAlternate ? "alternate" : "primary";

      selectedItems.push({
        type: "question",
        id: q.id,
        moduleId: q.moduleId,
        moduleName: q.moduleName,
        category: q.category,
        wordingType,
        prompt: wording.prompt,
        options: shuffle(wording.options),
        answer: wording.answer,
        explanation: wording.explanation,
        aliases: wording.aliases,
        keywords: wording.keywords,
        canTypeInHardMode: wording.canTypeInHardMode,
        points: 2,
      });
    }
  }

  // Shuffle final items so activities are mixed naturally with questions
  return shuffle(selectedItems);
}
