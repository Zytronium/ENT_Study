CREATE TABLE IF NOT EXISTS practice_exam_attempts (
  id SERIAL PRIMARY KEY,
  score INTEGER NOT NULL CHECK (score >= 0),
  total_points INTEGER NOT NULL CHECK (total_points > 0),
  percentage NUMERIC(5, 2) NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_practice_exam_attempts_percentage 
  ON practice_exam_attempts (percentage);

CREATE INDEX IF NOT EXISTS idx_practice_exam_attempts_created_at 
  ON practice_exam_attempts (created_at DESC);
