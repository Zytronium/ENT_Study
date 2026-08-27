<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Custom Project Instructions

## Quiz Page Styling
When creating or modifying quiz pages, follow the same styling patterns as existing quiz pages for consistency.
Reference the global styles in `app/globals.css` (especially `.quiz-action-card` and `.quiz-action-btn` classes) and
review existing quiz page implementations to maintain visual and structural consistency across all quizzes.

Quiz pages should not include any information that gives away any answers. Study info goes in the human-made study
guide. Do not edit the study guide Markdown file (public/STUDY_GUIDE.md) unless explicitly to.

## Quiz Content Scope
Quiz questions must ONLY cover material explicitly mentioned in the study guide. Do not include
questions about topics, concepts, or details that are not present in the study guide content. Try not to make
the correct answers exact quotes from the study guide unless necessary, as exact quotes stand out and look more 
obvious than they should. Try to word questions and answers in a way that they might be worded on the CCNA cert exam.
Avoid verbose correct answers when the other options are not verbose. Do not word any quiz or test questions, answers, 
or explanations like "according to the study guide," "based on the study guide," or anything else that references the 
term study guide or any alternate way to say "study guide" in reference to this website's study guide. 

## Quiz Hard Mode
After the user has gotten all the correct answers once, hard mode should activate, the same way it does on other 
quizzes. Hard mode scrambles question order, *sometimes* turns some or all questions into a type-the-answer type
but only if it's reasonably easy to validate the answer to those questions (i.e. "how does this work" or "why does this
happen" type questions should remain multiple choice but "what frequency does this describe" or "match this definition
to the correct term" type questions should be type-the-answer.). Do not refer to hard mode literally as "hard mode" in
the UI.

## Post-Quiz Instructions
After building or editing a study quiz, ensure you:
- update the root page.tsx to link to it
- link the new practice quiz to the study guide viewer if you created a new quiz
- edit lib/questions.ts and lib/registry.ts to include new questions and/or activities from the quiz and an alternatively worded version of each new question

Note: Flashcards count as questions, not activities. Bonus questions should not go into the practice test questions pool.

## General Rules
DO NOT use emojis or EM dashes unless explicitly asked to. Avoid the animate-pulse tailwind class. Ensure everything is
mobile responsive.
