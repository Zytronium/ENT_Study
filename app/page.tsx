import HomeClient from "@/components/HomeClient";
import { STATIC_STUDY_TOPICS } from "@/lib/study-topics";
import { getAllJsonQuizzes, jsonQuizToStudyTopic } from "@/lib/json-quizzes";

export default function Home() {
  // merge static and JSON-driven quiz modules
  const jsonStudyTopics = getAllJsonQuizzes().map(jsonQuizToStudyTopic);
  const studyTopics = [...STATIC_STUDY_TOPICS, ...jsonStudyTopics];

  return <HomeClient studyTopics={studyTopics} />;
}
