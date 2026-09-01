CREATE TABLE IF NOT EXISTS practice_exam_attempts (
  id SERIAL PRIMARY KEY,
  score INTEGER NOT NULL CHECK (score >= 0),
  total_points INTEGER NOT NULL CHECK (total_points > 0),
  test_length INTEGER NOT NULL DEFAULT 60 CHECK (test_length IN (60, 100, 150)),
  percentage NUMERIC(5, 2) NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE practice_exam_attempts
  ADD COLUMN IF NOT EXISTS test_length INTEGER NOT NULL DEFAULT 60;

UPDATE practice_exam_attempts
SET test_length = total_points
WHERE test_length = 60 AND total_points IN (60, 100, 150);

ALTER TABLE practice_exam_attempts
  DROP CONSTRAINT IF EXISTS practice_exam_attempts_test_length_check;

ALTER TABLE practice_exam_attempts
  ADD CONSTRAINT practice_exam_attempts_test_length_check CHECK (test_length IN (60, 100, 150));

CREATE INDEX IF NOT EXISTS idx_practice_exam_attempts_percentage 
  ON practice_exam_attempts (percentage);

CREATE INDEX IF NOT EXISTS idx_practice_exam_attempts_created_at 
  ON practice_exam_attempts (created_at DESC);

CREATE TABLE IF NOT EXISTS practice_speedrun_scores (
  id SERIAL PRIMARY KEY,
  display_name VARCHAR(24) NOT NULL CHECK (char_length(trim(display_name)) BETWEEN 1 AND 24),
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 10000),
  total_points INTEGER NOT NULL DEFAULT 10000 CHECK (total_points = 10000),
  elapsed_ms INTEGER NOT NULL CHECK (elapsed_ms >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_practice_speedrun_scores_ranking
  ON practice_speedrun_scores (score DESC, elapsed_ms ASC, created_at ASC);
