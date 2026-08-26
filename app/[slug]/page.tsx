import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllJsonQuizzes, getJsonQuizBySlug } from "@/lib/json-quizzes";
import JsonQuizRenderer from "@/components/study-quiz/JsonQuizRenderer";

// This route lives at the site root (/<slug>) alongside the hand-written quiz
// routes (/osi-model, /ports, /dns, etc). Next.js always matches a static
// route folder before falling back to a dynamic segment like this one, so an
// existing static route always wins on a name collision. Keep JSON quiz
// slugs distinct from every other top-level route folder in app/.

type PageProps = { params: Promise<{ slug: string }> };

// -------- static generation --------

export function generateStaticParams() {
  return getAllJsonQuizzes().map((quiz) => ({ slug: quiz.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getJsonQuizBySlug(slug);
  if (!quiz) return {};

  return {
    title: `${quiz.title} | ENT Study`,
    description: quiz.studyGuideDescription ?? quiz.homeDescription,
  };
}

export default async function JsonQuizPage({ params }: PageProps) {
  const { slug } = await params;
  const quiz = getJsonQuizBySlug(slug);
  if (!quiz) notFound();

  return <JsonQuizRenderer quiz={quiz} />;
}
