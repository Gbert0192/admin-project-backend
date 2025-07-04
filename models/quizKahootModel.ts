import { KahootQuizAttempt } from "../schemas/quizKahootSchema/quizKahoot.type.js";
import { BaseModel } from "./baseModel.js";

export interface QuizKahoot {
  form_kahoot_id: number;
  user_id: number;
  score: number;
  duration_seconds: number;
  submitted_at: Date;
}

interface AttemptAnswerPayload {
  question_id: number;
  user_answer: string[];
  is_correct: boolean;
  answered_at: number;
  question_started_at: number;
  duration: number;
}

export class QuizKahootModel extends BaseModel {
  async createQuizAttempt(quiz: QuizKahoot, answersPayload: AttemptAnswerPayload[]) {
    console.log("Attempting to insert quiz attempt:", quiz);
    
    const attemptInsertQuery = `INSERT INTO kahoot_quiz_attempts (form_kahoot_id, user_id, score, duration_seconds, submitted_at) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    
    let attemptResult;
    try {
      attemptResult = await this._db.query(attemptInsertQuery, [
        quiz.form_kahoot_id,
        quiz.user_id,
        quiz.score,
        quiz.duration_seconds,
        quiz.submitted_at,
      ]);
      console.log("Quiz attempt inserted successfully:", attemptResult.rows[0]);
    } catch (error) {
      console.error("Database error inserting quiz attempt:", error);
      throw error;
    }
    
    const newAttempId = attemptResult.rows[0].id;

    for (const answer of answersPayload) {
      const answerInsertQuery = `INSERT INTO kahoot_quiz_attempts_answers (attempt_id, question_id, user_answer, is_correct, answered_at, question_started_at, duration) VALUES ($1, $2, $3, $4, $5, $6, $7);`;
      const userAnswerJson = JSON.stringify(answer.user_answer);

      await this._db.query(answerInsertQuery, [
        newAttempId,
        answer.question_id,
        userAnswerJson,
        answer.is_correct,
        answer.answered_at,
        answer.question_started_at,
        answer.duration,
      ]);
    }
    return attemptResult.rows[0] as KahootQuizAttempt;
  }

  async getHistory(userId: number) {
    const query = `SELECT * FROM kahoot_quiz_attempts WHERE user_id = $1 ORDER BY created_at DESC;`;
    const result = await this._db.query(query, [userId]);
    return result.rows as KahootQuizAttempt[];
  }

  async getIsAllowed(user_id: number, form_kahoot_id: number) {
    const query = `select * from kahoot_quiz_attempts where user_id = $1 and form_kahoot_id = $2`;
    const result = await this._db.query(query, [user_id, form_kahoot_id]);
    return result.rows.length > 0;
  }
}
