import fs from 'fs';
import path from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import type { Element, ElementContent, Root } from 'hast';
import type { Metadata } from 'next';
import StudyGuideViewer, { TocItem } from './StudyGuideViewer';

export const metadata: Metadata = {
  title: "Study Guide | ENT Study",
  description: "Daniel's Interactive Study Guide for the Enterprise Networking Technologies (ENT) course at TTC.",
};

const TOPIC_QUIZ_MAP: Record<string, { title: string; quizUrl: string; quizName: string; description: string }> = {
  'osi-model': {
    title: 'OSI Model',
    quizUrl: '/osi-model',
    quizName: 'OSI Model Layer Matching Quiz',
    description: 'Correctly identify all 7 OSI layers.',
  },
  'networking-tools': {
    title: 'Networking Tools',
    quizUrl: '/networking-tools',
    quizName: 'Networking Tools Identification Quiz',
    description: 'Match the correct networking tools to their definitions.',
  },
  'modems-vs-routers': {
    title: 'Modems vs Routers',
    quizUrl: '/modem-router',
    quizName: 'Modem vs Router Diagnostic Quiz',
    description: 'Test your understanding of modems and routers.',
  },
  'eiatia-568b-standard-specification': {
    title: 'EIA/TIA 568B Standard',
    quizUrl: '/eia-tia-standard',
    quizName: 'EIA/TIA 568B Wire Ordering Challenge',
    description: 'Drag the wire colors into the correct order to match the 568B standard.',
  },
  'physical-layer-in-depth---bits-nibbles-and-bytes': {
    title: 'Bits, Nibbles, and Bytes',
    quizUrl: '/bits-nibbles-bytes',
    quizName: 'Bits, Nibbles & Bytes Mastery Challenge',
    description: 'Practice definitions, bit sizes, unit conversions, and abbreviations.',
  },
  'counting-bits--calculating-binary': {
    title: 'Binary Calculation',
    quizUrl: '/binary-calculation',
    quizName: 'Binary Calculation Interactive Simulator',
    description: 'Calculate the decimal values of 8-bit binary numbers.',
  },
  'connection-types': {
    title: 'Communication Types',
    quizUrl: '/communication-types',
    quizName: 'Simplex, Half-Duplex & Full-Duplex Quiz',
    description: 'Identify definitions and real-world examples of Simplex, Half-Duplex, and Full Duplex communication.',
  },
  'network-topologies': {
    title: 'Network Topologies',
    quizUrl: '/network-topologies',
    quizName: 'Network Topologies Matrix & Visual Quiz',
    description: 'Identify Star, Ring, Bus, and Mesh topologies through diagrams, definitions, and specifications.',
  },
  'wired-ethernet-standards': {
    title: 'Wired Ethernet Standards',
    quizUrl: '/802.3-ethernet-standards',
    quizName: 'IEEE 802.3 Standards Matrix',
    description: 'Complete the IEEE 802.3 wired Ethernet standards chart across speeds, cable types, max distances, and connectors.',
  },
  'patch-cables-vs-crossover-cables': {
    title: 'Patch vs Crossover Cables',
    quizUrl: '/patch-vs-crossover-cables',
    quizName: 'Patch vs Crossover Cables Challenge',
    description: 'Test your knowledge of patch (straight) cables vs crossover cables and STP vs UTP cabling.',
  },
  'cable-ratings': {
    title: 'Cable Ratings',
    quizUrl: '/cable-ratings',
    quizName: 'Cable Ratings & Facility Routing Blueprint',
    description: 'Test your knowledge of CMP (Plenum), CMR (Riser), and CM cable ratings and fire safety codes.',
  },
  'esd-emi--emp': {
    title: 'ESD, EMI, & EMP',
    quizUrl: '/esd-emi-emp',
    quizName: 'ESD, EMI & EMP Threat Diagnostic',
    description: 'Test your understanding of ESD, EMI, and EMP through definitions, scenarios, and characteristics.',
  },
  'wireless-80211': {
    title: 'Wireless 802.11',
    quizUrl: '/wireless-802-11',
    quizName: 'Wireless 802.11 & Router Security Simulator',
    description: 'Test your knowledge of RF frequencies (2.4/5 GHz) and router security configurations (WPA2/WPA3).',
  },
  'wireless-wi-fi-standards': {
    title: 'Wireless Wi-Fi Standards',
    quizUrl: '/802.11-wireless-standards',
    quizName: 'IEEE 802.11 Wi-Fi Standards Matrix',
    description: 'Complete the IEEE 802.11 wireless standards chart across versions, frequencies, speeds, and distances.',
  },
  'wired-vs-wireless': {
    title: 'Wired vs Wireless',
    quizUrl: '/wired-vs-wireless',
    quizName: 'Wired vs Wireless & Contention Quiz',
    description: 'Compare wired and wireless characteristics and contention traffic control methods (CSMA/CD vs CSMA/CA).',
  },
  'wan-technologies': {
    title: 'WAN Technologies',
    quizUrl: '/wan-technologies',
    quizName: 'WAN Technologies & Carrier Lines Assessment',
    description: 'Test your understanding of dial-up POTS lines, modems, digital carrier specifications (ISDN, T1, T3, E1, E3), channel counts, and regional deployments.',
  },
  'hexadecimal': {
    title: 'Hexadecimal',
    quizUrl: '/hexadecimal',
    quizName: 'Hexadecimal Conversion Interactive Simulator',
    description: 'Practice converting between hexadecimal, binary, and decimal values.',
  },
};

type Token =
  | { kind: 'img'; node: Element }
  | { kind: 'connector'; node: Element | { type: 'text'; value: string } }
  | { kind: 'content'; node: ElementContent };

function tokenize(children: ElementContent[]): Token[] {
  return children.map((child) => {
    if (child.type === 'element' && child.tagName === 'img') return { kind: 'img', node: child };
    if (child.type === 'element' && child.tagName === 'br') return { kind: 'connector', node: child };
    if (child.type === 'text' && child.value.trim() === '') return { kind: 'connector', node: child };
    return { kind: 'content', node: child };
  });
}

function chunkImages(images: Element[], size: number): Element[][] {
  const chunks: Element[][] = [];
  for (let i = 0; i < images.length; i += size) {
    chunks.push(images.slice(i, i + size));
  }
  return chunks;
}

function makeImageGrid(images: Element[]): Element {
  return {
    type: 'element',
    tagName: 'div',
    properties: {
      className: ['image-grid'],
      style: `--grid-cols: ${images.length}`,
    },
    children: images,
  };
}

function splitParagraphIntoNodes(p: Element): Element[] {
  const tokens = tokenize(p.children);
  const segments: Array<{ type: 'content'; nodes: ElementContent[] } | { type: 'images'; images: Element[] }> = [];

  let pending: Token[] = [];

  const appendContent = (nodes: ElementContent[]) => {
    const last = segments[segments.length - 1];
    if (last && last.type === 'content') {
      last.nodes.push(...nodes);
    } else {
      segments.push({ type: 'content', nodes: [...nodes] });
    }
  };

  const flushPending = () => {
    if (pending.length === 0) return;
    const imgCount = pending.filter((t) => t.kind === 'img').length;
    if (imgCount >= 2) {
      segments.push({
        type: 'images',
        images: pending.filter((t) => t.kind === 'img').map((t) => t.node as Element),
      });
    } else {
      appendContent(pending.map((t) => t.node));
    }
    pending = [];
  };

  for (const token of tokens) {
    if (token.kind === 'content') {
      flushPending();
      appendContent([token.node]);
    } else {
      pending.push(token);
    }
  }
  flushPending();

  if (!segments.some((s) => s.type === 'images')) {
    return [p];
  }

  const result: Element[] = [];
  for (const seg of segments) {
    if (seg.type === 'content') {
      const hasReal = seg.nodes.some(
        (n) => !(n.type === 'text' && n.value.trim() === '') && !(n.type === 'element' && n.tagName === 'br')
      );
      if (!hasReal) continue;
      result.push({ type: 'element', tagName: 'p', properties: p.properties, children: seg.nodes });
    } else {
      for (const chunk of chunkImages(seg.images, 5)) {
        result.push(makeImageGrid(chunk));
      }
    }
  }
  return result;
}

function rehypeImageGrid() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (!('children' in node) || !node.children) return;

      const children = node.children as Element[];
      const newChildren: Element[] = [];

      for (const child of children) {
        if (child.type === 'element' && child.tagName === 'p') {
          newChildren.push(...splitParagraphIntoNodes(child));
        } else {
          newChildren.push(child);
        }
      }

      node.children = newChildren;
    });
  };
}

function injectQuizCards(html: string): string {
  return html.replace(/<h([23])\s+id="([^"]+)"[^>]*>(.*?)<\/h\1>/g, (fullMatch, level, id) => {
    const topic = TOPIC_QUIZ_MAP[id];
    if (!topic) return fullMatch;

    const cardHtml = `
<div class="not-prose my-6 p-4 rounded bg-slate-900 border border-accent/40 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 quiz-action-card no-print">
  <div class="space-y-1">
    <div class="flex items-center gap-2">
      <span class="px-2 py-0.5 rounded bg-accent/20 text-accent text-[11px] font-bold tracking-wide border border-accent/30 uppercase">
        [INTERACTIVE QUIZ]
      </span>
    </div>
    <div class="text-sm font-bold text-slate-100">${topic.quizName}</div>
    <p class="text-xs text-slate-400">${topic.description}</p>
  </div>
  <a
    href="${topic.quizUrl}"
    class="quiz-action-btn inline-flex items-center gap-2 px-4 py-2 rounded bg-accent hover:bg-emerald-400 !text-slate-950 hover:!text-slate-950 text-xs font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md shrink-0 !no-underline"
    style="color: #020617 !important; text-decoration: none !important;"
  >
    <span style="color: #020617 !important;">PRACTICE QUIZ</span>
    <span style="color: #020617 !important;">&rarr;</span>
  </a>
</div>`;

    return `${fullMatch}\n${cardHtml}`;
  });
}

function extractToc(html: string): TocItem[] {
  const toc: TocItem[] = [];
  const regex = /<h([23])\s+id="([^"]+)"[^>]*>(.*?)<\/h\1>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const id = match[2];
    const rawText = match[3].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#x26;/g, '&');
    toc.push({
      id,
      text: rawText,
      level,
    });
  }
  return toc;
}

export default async function StudyGuidePage() {
  const filePath = path.join(process.cwd(), 'public', 'STUDY_GUIDE.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeImageGrid)
    .use(rehypeStringify)
    .process(fileContents);

  const rawHtml = processedContent.toString();
  const tocItems = extractToc(rawHtml);
  const contentHtml = injectQuizCards(rawHtml);

  return <StudyGuideViewer initialHtml={contentHtml} tocItems={tocItems} />;
}
