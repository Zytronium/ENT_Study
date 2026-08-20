'use client';

import React, { useEffect, useState, useRef, useTransition, useCallback } from 'react';
import Link from 'next/link';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface StudyGuideViewerProps {
  initialHtml: string;
  tocItems: TocItem[];
}

export default function StudyGuideViewer({ initialHtml, tocItems }: StudyGuideViewerProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [matchCount, setMatchCount] = useState(0);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [, startTransition] = useTransition();

  // Keep track of match marks
  const matchesRef = useRef<HTMLElement[]>([]);

  // Count only h2 headings (## in Markdown) as main topics
  const topicCount = tocItems.filter((item) => item.level === 2).length;

  // --------------------------------------------------------------------------
  // ScrollSpy: Track visible heading, scroll progress & 10 REM threshold
  // --------------------------------------------------------------------------
  useEffect(() => {
    const headingElements = tocItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const handleScroll = () => {
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      setShowBackToTop(window.scrollY >= 10 * rootFontSize);

      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalDocHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalDocHeight) * 100)));
      }

      if (headingElements.length === 0) return;

      const scrollPosition = window.scrollY + 120; // Offset for sticky navbar
      let currentActive = headingElements[0]?.id || '';

      for (let i = 0; i < headingElements.length; i++) {
        const el = headingElements[i];
        if (el.offsetTop <= scrollPosition) {
          currentActive = el.id;
        } else {
          break;
        }
      }

      setActiveHeadingId(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [tocItems]);

  // --------------------------------------------------------------------------
  // Search & Term Highlighting
  // --------------------------------------------------------------------------
  const clearHighlights = useCallback(() => {
    if (!contentRef.current) return;
    const marks = contentRef.current.querySelectorAll('mark.sg-search-highlight');
    marks.forEach((mark) => {
      const parent = mark.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(mark.textContent || ''), mark);
        parent.normalize();
      }
    });
    matchesRef.current = [];
    setMatchCount(0);
    setCurrentMatchIndex(0);
  }, []);

  const highlightCurrentMatch = useCallback((matches: HTMLElement[], idx: number) => {
    matches.forEach((m, i) => {
      if (i === idx) {
        m.className =
          'sg-search-highlight bg-emerald-400 text-slate-950 px-1 py-0.5 rounded font-extrabold ring-2 ring-emerald-300 shadow-lg scale-105 inline-block';
        m.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        m.className =
          'sg-search-highlight bg-amber-400/90 text-slate-950 px-0.5 rounded font-bold transition-all';
      }
    });
  }, []);

  const applyHighlights = useCallback(
    (query: string) => {
      clearHighlights();
      const container = contentRef.current;
      if (!container || !query.trim()) return;

      const trimmedQuery = query.trim().toLowerCase();
      const treeWalker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            const tag = parent.tagName.toLowerCase();
            if (['script', 'style', 'mark', 'button'].includes(tag)) {
              return NodeFilter.FILTER_REJECT;
            }
            if (parent.closest('.no-search')) {
              return NodeFilter.FILTER_REJECT;
            }
            return node.textContent && node.textContent.toLowerCase().includes(trimmedQuery)
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_SKIP;
          },
        }
      );

      const textNodes: Text[] = [];
      let currentNode = treeWalker.nextNode();
      while (currentNode) {
        textNodes.push(currentNode as Text);
        currentNode = treeWalker.nextNode();
      }

      const newMatches: HTMLElement[] = [];

      textNodes.forEach((node) => {
        const text = node.textContent || '';
        const lowerText = text.toLowerCase();
        let startIndex = 0;
        let index = lowerText.indexOf(trimmedQuery, startIndex);

        if (index === -1) return;

        const fragment = document.createDocumentFragment();

        while (index !== -1) {
          // Add text before match
          if (index > startIndex) {
            fragment.appendChild(document.createTextNode(text.substring(startIndex, index)));
          }

          // Create mark element
          const mark = document.createElement('mark');
          mark.className = 'sg-search-highlight bg-amber-400 text-slate-950 px-0.5 rounded font-bold transition-all';
          mark.textContent = text.substring(index, index + trimmedQuery.length);
          fragment.appendChild(mark);
          newMatches.push(mark);

          startIndex = index + trimmedQuery.length;
          index = lowerText.indexOf(trimmedQuery, startIndex);
        }

        // Add remaining text
        if (startIndex < text.length) {
          fragment.appendChild(document.createTextNode(text.substring(startIndex)));
        }

        if (node.parentNode) {
          node.parentNode.replaceChild(fragment, node);
        }
      });

      matchesRef.current = newMatches;
      setMatchCount(newMatches.length);

      if (newMatches.length > 0) {
        setCurrentMatchIndex(1);
        highlightCurrentMatch(newMatches, 0);
      } else {
        setCurrentMatchIndex(0);
      }
    },
    [clearHighlights, highlightCurrentMatch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    startTransition(() => {
      applyHighlights(val);
    });
  };

  const handleNextMatch = () => {
    if (matchesRef.current.length === 0) return;
    const nextIndex = currentMatchIndex >= matchesRef.current.length ? 1 : currentMatchIndex + 1;
    setCurrentMatchIndex(nextIndex);
    highlightCurrentMatch(matchesRef.current, nextIndex - 1);
  };

  const handlePrevMatch = () => {
    if (matchesRef.current.length === 0) return;
    const prevIndex = currentMatchIndex <= 1 ? matchesRef.current.length : currentMatchIndex - 1;
    setCurrentMatchIndex(prevIndex);
    highlightCurrentMatch(matchesRef.current, prevIndex - 1);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    clearHighlights();
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToHeading = (id: string) => {
    setIsMobileTocOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-mono">
      {/* ---------------- STICKY TOP CONTROLS NAVBAR ---------------- */}
      <header className="sticky top-0 z-40 bg-slate-950/95 border-b border-border backdrop-blur-md px-4 sm:px-6 py-3 no-print relative">
        {/* Reading progress bar */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-400 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left: Brand & Navigation */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-xs sm:text-sm font-mono text-accent hover:underline flex items-center gap-1 font-bold shrink-0"
              >
                &lt; BACK TO HUB
              </Link>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <h1 className="text-sm sm:text-base font-bold text-slate-100 font-mono truncate">
                ENT Study Guide
              </h1>
            </div>

            {/* Mobile TOC & Print buttons */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileTocOpen(true)}
                className="p-1.5 text-xs font-mono bg-slate-900 border border-border hover:border-accent text-accent rounded flex items-center gap-1 font-bold cursor-pointer"
                title="Open Table of Contents"
              >
                <span>TOC</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="p-1.5 text-xs font-mono bg-slate-900 border border-border hover:border-accent text-slate-200 rounded flex items-center gap-1 cursor-pointer"
                title="Print or Export PDF"
              >
                <span>PRINT</span>
              </button>
            </div>
          </div>

          {/* Center: Real-Time In-Page Search */}
          <div className="w-full md:max-w-md flex items-center gap-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 text-xs font-mono font-bold">
                &gt;
              </div>
              <input
                type="text"
                placeholder="Search study guide terms (e.g., OSI, EIA/TIA, 10GBASE-T, Plenum)..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (e.shiftKey) handlePrevMatch();
                    else handleNextMatch();
                  } else if (e.key === 'Escape') {
                    handleClearSearch();
                  }
                }}
                className="w-full pl-8 pr-16 py-1.5 bg-slate-900 border border-border focus:border-accent rounded text-xs sm:text-sm font-mono text-slate-100 placeholder-slate-500 outline-none transition-colors"
              />

              {searchQuery && (
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1">
                  <span className="text-[10px] font-mono text-slate-400">
                    {matchCount > 0 ? `${currentMatchIndex}/${matchCount}` : '0 found'}
                  </span>
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="p-0.5 text-slate-400 hover:text-slate-100 text-xs cursor-pointer"
                    title="Clear search"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Match Navigation Buttons */}
            {matchCount > 0 && (
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={handlePrevMatch}
                  title="Previous match (Shift+Enter)"
                  className="px-2 py-1 bg-slate-900 border border-border hover:border-accent text-slate-200 rounded text-xs font-mono cursor-pointer"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={handleNextMatch}
                  title="Next match (Enter)"
                  className="px-2 py-1 bg-slate-900 border border-border hover:border-accent text-slate-200 rounded text-xs font-mono cursor-pointer"
                >
                  ▼
                </button>
              </div>
            )}
          </div>

          {/* Right: Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="px-3 py-1.5 text-xs font-mono bg-slate-900 border border-border hover:border-accent text-slate-300 hover:text-accent rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isSidebarOpen ? '◀ Hide TOC' : '▶ Show TOC'}</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-mono bg-emerald-950/40 border border-accent/60 hover:bg-accent hover:text-slate-950 text-accent font-bold rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>PRINT / EXPORT PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- MAIN LAYOUT WITH TOC SIDEBAR & ARTICLE ---------------- */}
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col md:flex-row p-4 sm:p-6 md:p-8 gap-8 items-start">
        {/* Desktop Sticky Sidebar TOC */}
        {isSidebarOpen && (
          <aside className="hidden md:block w-72 shrink-0 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto no-print terminal-box text-xs font-mono p-4 border border-border">
            <div className="flex items-center justify-between border-b border-border pb-2 mb-3">
              <span className="font-bold text-accent uppercase tracking-wider">
                Table of Contents
              </span>
              <span className="text-[10px] text-slate-500">{topicCount} topics</span>
            </div>

            <nav className="space-y-1">
              {tocItems.map((item) => {
                const isActive = activeHeadingId === item.id;
                const isH3 = item.level === 3;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToHeading(item.id)}
                    className={`block w-full text-left py-1.5 px-2 rounded transition-colors truncate font-mono cursor-pointer ${
                      isH3 ? 'pl-5 text-[11px] text-slate-400 hover:text-slate-200' : 'font-semibold text-slate-300 hover:text-slate-100'
                    } ${
                      isActive
                        ? 'bg-accent/20 text-accent font-bold border-l-2 border-accent pl-2'
                        : 'hover:bg-slate-800/60'
                    }`}
                    title={item.text}
                  >
                    {item.text}
                  </button>
                );
              })}
            </nav>
          </aside>
        )}

        {/* Article Markdown Content */}
        <main className="flex-1 w-full min-w-0 study-guide-content">
          <article
            ref={contentRef}
            className="prose prose-invert max-w-none font-mono [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-border [&_th]:p-2 [&_th]:bg-slate-900 [&_th]:text-accent [&_td]:border [&_td]:border-border/60 [&_td]:p-2 [&_pre]:bg-slate-950 [&_pre]:border [&_pre]:border-border [&_img]:rounded [&_img]:border [&_img]:border-border [&_img]:max-w-full [&_img]:h-auto [&_a:not(.quiz-action-btn)]:text-accent hover:[&_a:not(.quiz-action-btn)]:underline [&_h1]:text-accent [&_h2]:text-accent [&_h2]:border-b [&_h2]:border-border [&_h2]:pb-2 [&_h2]:mt-10 [&_h3]:text-slate-200 [&_h3]:mt-6"
            dangerouslySetInnerHTML={{ __html: initialHtml }}
          />
        </main>
      </div>

      {/* ---------------- MOBILE DRAWER TOC ---------------- */}
      {isMobileTocOpen && (
        <div className="fixed inset-0 z-50 flex bg-slate-950/80 backdrop-blur-sm md:hidden no-print">
          <div className="relative w-4/5 max-w-sm bg-slate-900 border-r border-border h-full p-4 overflow-y-auto flex flex-col font-mono text-xs">
            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-accent text-sm">
                  Table of Contents
                </span>
                <span className="text-[10px] text-slate-500">({topicCount} topics)</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileTocOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-100 text-base"
              >
                ✕
              </button>
            </div>

            <nav className="space-y-1 flex-grow overflow-y-auto">
              {tocItems.map((item) => {
                const isActive = activeHeadingId === item.id;
                const isH3 = item.level === 3;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToHeading(item.id)}
                    className={`block w-full text-left py-2 px-2 rounded transition-colors ${
                      isH3 ? 'pl-6 text-slate-400' : 'font-bold text-slate-200'
                    } ${
                      isActive ? 'bg-accent/20 text-accent border-l-2 border-accent' : 'hover:bg-slate-800'
                    }`}
                  >
                    {item.text}
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="flex-1" onClick={() => setIsMobileTocOpen(false)} />
        </div>
      )}

      {/* ---------------- FLOATING BACK TO TOP BUTTON (VISIBLE ONLY AFTER 10 REM SCROLL) ---------------- */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 p-3 bg-slate-900/90 border border-border hover:border-accent text-accent font-mono text-xs rounded-full shadow-xl backdrop-blur transition-all hover:scale-110 no-print flex items-center gap-1"
          title="Scroll back to top"
        >
          ▲ <span className="font-bold">TOP</span>
        </button>
      )}
    </div>
  );
}
