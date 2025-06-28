import { HuaweiQuizAttempt } from "../schemas/quizHuaweiSchema/quizHuawei.type.js";
import { BaseModel } from "./baseModel.js";

export interface QuizHuawei {
  form_huawei_id: number;
  user_id: number;
  score: number;
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
      INSERT INTO huawei_quiz_attempts (form_huawei_id, user_id, score, duration_seconds)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
    const attemptResult = await this._db.query(attemptInsertQuery, [
      quizPayload.form_huawei_id,
      quizPayload.user_id,
      quizPayload.score,
      quizPayload.duration_seconds,
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
    const query = `select * from huawei_quiz_attempts where user_id = $1 and form_huawei_id = $2`;
    const result = await this._db.query(query, [user_id, form_huawei_id]);
    return result.rows.length > 0;
  }
}
