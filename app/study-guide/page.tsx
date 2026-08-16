import fs from 'fs';
import path from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Study Guide | ENT Study",
  description: "Daniel's Interactive Study Guide for the Enterprise Networking Technologies (ENT) course at TTC.",
};

export default async function StudyGuidePage() {
  const filePath = path.join(process.cwd(), 'public', 'STUDY_GUIDE.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(fileContents);
  const contentHtml = processedContent.toString();

  return (
    <article
      className="prose prose-invert max-w-none mx-4 sm:mx-8 md:mx-12 my-4 sm:my-8 md:my-12 [&_table]:w-auto"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
