export interface ExamSubmissionPayload {
  score: number;
  totalPoints: number;
}

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
  message?: string;
  offline?: boolean;
}

export interface GlobalAnalyticsResponse {
  totalAttempts: number;
  averageScore: number;
  averagePercentage: number;
  passRate: number;
  offline?: boolean;
}
