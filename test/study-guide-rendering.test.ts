import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

describe("Study Guide Markdown Superscript & HTML Rendering", () => {
  async function renderMarkdown(content: string): Promise<string> {
    const result = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeSlug)
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content);
    return result.toString();
  }

  it("should preserve superscript <sup> tags in paragraph text", async () => {
    const markdown = "IPv6 address space supports 2<sup>128</sup> unique addresses.";
    const html = await renderMarkdown(markdown);
    assert.match(html, /2<sup>128<\/sup>/);
  });

  it("should preserve <sup> tags inside markdown list items", async () => {
    const markdown = "- Over 340 Undecillion (or 2<sup>128</sup>) unique possible IPv6 addresses";
    const html = await renderMarkdown(markdown);
    assert.match(html, /<li>Over 340 Undecillion \(or 2<sup>128<\/sup>\) unique possible IPv6 addresses<\/li>/);
  });

  it("should preserve <sup> tags in table cells", async () => {
    const markdown = `| Exponential | Decimal |
| --- | --- |
| 2<sup>8</sup> | 256 |
| 2<sup>16</sup> | 65536 |`;
    const html = await renderMarkdown(markdown);
    assert.match(html, /<td>2<sup>8<\/sup><\/td>/);
    assert.match(html, /<td>2<sup>16<\/sup><\/td>/);
  });

  it("should correctly render the actual STUDY_GUIDE.md containing 2<sup>128</sup>", async () => {
    const filePath = path.join(process.cwd(), "public", "STUDY_GUIDE.md");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const html = await renderMarkdown(fileContents);
    assert.match(html, /2<sup>128<\/sup>/);
    assert.doesNotMatch(html, /or 2128\)/);
  });
});
