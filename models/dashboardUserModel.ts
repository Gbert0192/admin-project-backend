import { BaseModel } from "./baseModel.js";

interface QuizAttempts {
  id: number;
  user_id: number;
  score: number;
  max_score: number | null;
  form_huawei_id: number;
  created_at: Date;
  updated_at: Date;
}

export class DashboardUserModel extends BaseModel {
  async getQuizComplete(userId: number): Promise<number> {
    const query = `
      SELECT COUNT(*) 
      FROM huawei_quiz_attempts
      WHERE user_id = $1;
    `;
    const result = await this._db.query(query, [userId]);
    const totalCount = parseInt(result.rows[0].count, 10) || 0;
    return totalCount;
  }
  async getAverageScore(userId: number): Promise<number | null> {
    const query = `
      SELECT
        score,
        max_score,
        (score::NUMERIC / max_score::NUMERIC) * 100 AS average_percentage_score
      FROM
        huawei_quiz_attempts
      WHERE
        user_id = $1 and max_score > 0;
    `;

    const result = await this._db.query(query, [userId]);

    const averageScore = result.rows[0]?.average_percentage_score;
    if (averageScore === null || averageScore === undefined) {
      return null;
    }

    return Math.round(averageScore);
  }
  async getQuizCount() {
    const query = `
    select *,count(*) OVER () AS total_count from form_huawei where is_published is true and deleted_at is null;
    `;
    const result = await this._db.query(query);

    const rows = result.rows[0];
    return rows as number;
  }
  async getQuizHistory(userId: number): Promise<QuizAttempts[]> {
    const query = `
    (
      SELECT
          id,
          user_id,
          form_huawei_id AS form_id,
          score,
          max_score,
          submitted_at,
          'huawei' AS source
      FROM
          huawei_quiz_attempts
      WHERE
          user_id = $1
    )
    UNION ALL
    (
      SELECT
          id,
          user_id,
          form_kahoot_id AS form_id,
          score,
          null AS max_score,
          submitted_at,
          'kahoot' AS source
      FROM
          kahoot_quiz_attempts
      WHERE
          user_id = $1
    )
    ORDER BY submitted_at DESC;
  `;

    const result = await this._db.query(query, [userId]);
    return result.rows as QuizAttempts[];
  }
  async getNewestQuiz(userId: number) {
    const query = `
    (
      SELECT
          f.uuid,
          f.form_title,
          f.form_description,
          f.created_at,
          'huawei' AS source
      FROM
          form_huawei f
      LEFT JOIN 
          huawei_quiz_attempts a ON f.id = a.form_huawei_id AND a.user_id = $1
      WHERE
          f.is_published IS TRUE
          AND f.deleted_at IS NULL
          AND a.id IS NULL 
    )
    UNION ALL
    (
      SELECT
          f.uuid,
          f.form_title,
          f.form_description,
          f.created_at,
          'kahoot' AS source
      FROM
          form_kahoot f
      LEFT JOIN 
          kahoot_quiz_attempts a ON f.id = a.form_kahoot_id AND a.user_id = $1
      WHERE
          f.is_published IS TRUE
          AND f.deleted_at IS NULL
          AND a.id IS NULL 
    )
    ORDER BY created_at DESC
    LIMIT 5;
  `;

    const result = await this._db.query(query, [userId]);

    return result.rows as {
      uuid: string;
      form_title: string;
      form_description: string;
      created_at: Date;
      source: "huawei" | "kahoot";
    }[];
  }
}
