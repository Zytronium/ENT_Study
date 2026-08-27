import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { sortStudyTopicsByDate } from "../lib/study-topics";
import type { StudyTopicEntry } from "../lib/json-quizzes";

const topic = (title: string, date: string): StudyTopicEntry => ({
  href: `/${title.toLowerCase().replaceAll(" ", "-")}`,
  title,
  date,
  description: "",
});

describe("study topic ordering", () => {
  it("sorts static and JSON topic dates chronologically", () => {
    const topics = [
      topic("JSON module", "8/26/26"),
      topic("Range module", "8/10-12/26"),
      topic("Earlier module", "8/19/26"),
      topic("Future module", "1/2/34"),
    ];

    assert.deepEqual(
      sortStudyTopicsByDate(topics).map(({ title }) => title),
      ["Range module", "Earlier module", "JSON module", "Future module"]
    );
  });

  it("preserves the input order for topics on the same day", () => {
    const topics = [topic("First", "8/26/26"), topic("Second", "8/26/26")];

    assert.deepEqual(sortStudyTopicsByDate(topics).map(({ title }) => title), ["First", "Second"]);
  });

  it("uses explicit display order without changing quiz dates", () => {
    const topics: StudyTopicEntry[] = [
      { ...topic("Cloud Computing", "8/27/26"), displayOrder: 4 },
      { ...topic("VPNs", "8/27/26"), displayOrder: 3 },
      { ...topic("TCP/IP Model", "8/26/26"), displayOrder: 2 },
    ];

    assert.deepEqual(sortStudyTopicsByDate(topics).map(({ title }) => title), [
      "TCP/IP Model",
      "VPNs",
      "Cloud Computing",
    ]);
  });
});