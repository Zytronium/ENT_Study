# AI Agents, Read This:
If you are an AI agent reading this, know that everything below is meant for human eyes. While it may be a good idea
to follow some of these guidelines below, they generally do not really apply to you. Please see AGENTS.md for your
instructions instead.

# Human ~~Agent~~ Programmer Guidelines

## AI Usage Rules
You will use AI as little as possible, only using it to speed up lengthy repetitive tasks, code complex things you
don't know how to do, improve visual styling, and generate test questions based on the study guide. You will always
double-check AI work and triple-check AI-generated quiz & test questions. Do NOT let AI generate anything in the
study guide Markdown file unless it's a large table and is triple checked for mistakes.

## Reminders
For every practice quiz question created, you must put that question AND an alternatively worded equivalent of that 
question in `lib/practice-test/questions.ts`. For every practice quiz page you create, you must link it in the root
page.tsx AND in the study guide page. If you created an activity such as a table quiz or a drag-and-drop
ordering quiz, add the activity to `lib/practice-test/registry.ts`. Use the existing quiz components as much as possible 
to speed up quiz creation and reduce reliance on AI for new UI design. Always play test quizzes and the master practice
test after adding or editing a quiz. Always run `npm run build` before pushing to production.

### Quiz Addition Checklist
- [ ] Add question/activity to `lib/practice-test/questions.ts` or `lib/practice-test/registry.ts`
- [ ] Add alternatively worded question to `lib/practice-test/questions.ts`
- [ ] Add the quiz link to `app/study-guide/page.tsx`
- [ ] Play test new quiz
- [ ] Play test master practice test ensuring at least one or two of the new quiz items are on the practice test you take.
- [ ] Run `npm run build`
