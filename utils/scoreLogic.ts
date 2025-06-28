interface CalculateScore {
  is_correct: boolean;
  answered_at: number;
  question_started_at: number;
  duration: number;
  max_score?: number;
  min_score?: number;
}

export const calculateScore = ({
  is_correct,
  answered_at,
  question_started_at,
  duration,
  max_score = 1000,
  min_score = 200,
}: CalculateScore): number => {
  if (!is_correct) return 0;

  const timeTaken = (answered_at - question_started_at) / 1000;
  if (timeTaken > duration) return 0;

  const remainingTime = Math.max(0, duration - timeTaken);
  const rawScore = Math.floor(
    min_score + (max_score - min_score) * (remainingTime / duration)
  );

  return rawScore;
};
