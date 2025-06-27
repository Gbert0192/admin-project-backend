export interface HuaweiQuizAttempt {
  id: number;
  uuid: string;
  user_id: number;
  form_huawei_id: number;
  score: number;
  duration_seconds: number;
  submitted_at: string;
}
