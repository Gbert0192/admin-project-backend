import { HuaweiQuizAttempt } from "../schemas/quizHuaweiSchema/quizHuawei.type.js";
import { BaseModel } from "./baseModel.js";

export interface QuizHuawei {
  form_huawei_id: number;
  user_id: number;
  score: number;
  max_score: number;
  duration_seconds: number;
}

interface AttemptAnswerPayload {
  question_id: number;
  user_answer: string[];
  is_correct: boolean;
}

export class QuizHuaweiModel extends BaseModel {
  async getHistory(user_id: number) {
    const query = `select * from huawei_quiz_attempts where user_id = $1 order by created_at desc`;
    const result = await this._db.query(query, [user_id]);
    return result.rows as HuaweiQuizAttempt[];
  }
  async create(
    quizPayload: QuizHuawei,
    answerPayloads: AttemptAnswerPayload[]
  ) {
    const attemptInsertQuery = `
      INSERT INTO huawei_quiz_attempts (form_huawei_id, user_id, score, duration_seconds, max_score)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;
    const attemptResult = await this._db.query(attemptInsertQuery, [
      quizPayload.form_huawei_id,
      quizPayload.user_id,
      quizPayload.score,
      quizPayload.duration_seconds,
      quizPayload.max_score,
    ]);

    const newAttemptId = attemptResult.rows[0].id;

    for (const answer of answerPayloads) {
      const answerInsertQuery = `
        INSERT INTO huawei_quiz_attempt_answers (attempt_id, question_id, user_answer, is_correct)
        VALUES ($1, $2, $3, $4);
      `;
      const userAnswerJson = JSON.stringify(answer.user_answer);

      await this._db.query(answerInsertQuery, [
        newAttemptId,
        answer.question_id,
        userAnswerJson,
        answer.is_correct,
      ]);
    }
    return attemptResult.rows[0] as HuaweiQuizAttempt;
  }

  async getIsAllowed(user_id: number, form_huawei_id: number) {
    const query = `
      SELECT 
        fh.trial_limit,
        (
          SELECT COUNT(*) 
          FROM huawei_quiz_attempts hqa 
          WHERE hqa.user_id = $1 AND hqa.form_huawei_id = fh.id
        ) AS attempt_count
      FROM 
        form_huawei fh
      WHERE 
        fh.id = $2;
    `;

    const result = await this._db.query(query, [user_id, form_huawei_id]);
    if (result.rows.length === 0) {
      return false;
    }

    const data = result.rows[0];
    const trialLimit = Number(data.trial_limit);
    const attemptCount = Number(data.attempt_count);
    const bool = attemptCount < trialLimit;
    return bool;
  }
}
