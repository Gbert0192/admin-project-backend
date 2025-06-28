export interface KahootQuizAttempt {
  id: number;
  uuid: string;
  user_id: number;
  form_kahoot_id: number;
  score: number;
  duration_seconds: number;
  submitted_at: string;
}