interface CalculateScore {
  is_correct: boolean;
  answered_at: number;
  question_started_at: number;
  duration: number;
}

export const calculateScore = ({
  is_correct,
  answered_at,
  question_started_at,
  duration,
}: CalculateScore): number => {
  if (!is_correct) return 0;

  const timeTaken = (answered_at - question_started_at) / 1000;
  const remainingTime = Math.max(0, duration - timeTaken);

  if (remainingTime <= 0) return 0;

  const score = Math.floor(1000 * (remainingTime / duration));
  return score;
};
