export interface ExamSubmissionPayload {
  score: number;
  totalPoints: number;
  testLength?: PracticeTestLength;
}

export type PracticeTestLength = 60 | 100 | 150;

export interface PracticeExamStats {
  totalAttempts: number;
  averageScore?: number;
  averagePercentage: number;
  passRate: number;
}

export interface ExamAttemptRecord {
  score: number;
  totalPoints: number;
  percentage: number;
}

export interface ExamSubmissionResponse {
  success: boolean;
  attempt?: ExamAttemptRecord;
  percentile?: number;
  previousAttempts?: number;
  stats?: PracticeExamStats;
  byLength?: Partial<Record<PracticeTestLength, PracticeExamStats>>;
  message?: string;
  offline?: boolean;
}

export interface GlobalAnalyticsResponse {
  totalAttempts: number;
  averageScore: number;
  averagePercentage: number;
  passRate: number;
  byLength?: Partial<Record<PracticeTestLength, PracticeExamStats>>;
  offline?: boolean;
}
