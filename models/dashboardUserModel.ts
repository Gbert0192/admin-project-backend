import { BaseModel } from "./baseModel.js";

export class DashboardUserModel extends BaseModel {
  async getQuizComplete(userId: number) {
    const query = `
    SELECT *, COUNT(*) OVER () AS total_count
    FROM huawei_quiz_attempts
    WHERE user_id = $1;
    `;
    const result = await this._db.query(query, [userId]);
    const rows = result.rows[0].total_count;
    return rows as number;
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
    console.log(averageScore);

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
}
