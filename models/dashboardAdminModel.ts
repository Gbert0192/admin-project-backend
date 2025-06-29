import { BaseModel } from "./baseModel.js";

interface FormTrendData {
  date: string;
  huawei_count: number;
  kahoot_count: number;
}

interface FormAttemptStats {
  form_id: number;
  form_title: string;
  total_user_attempts: number;
}

export class DashboardAdminModel extends BaseModel {
  async getTotalHuaweiForms() {
    const query = `
            SELECT COUNT(*) AS total
            FROM form_huawei
            WHERE deleted_at IS NULL
        `;
    const result = await this._db.query(query);
    return result.rows[0].total as number;
  }

  async getTotalKahootForms() {
    const query = `
            SELECT COUNT(*) AS total
            FROM form_kahoot
            WHERE deleted_at IS NULL
        `;
    const result = await this._db.query(query);
    return result.rows[0].total as number;
  }

  async getTotalUsers() {
    const query = `
            SELECT COUNT(*) AS total
            FROM users
            WHERE deleted_at IS NULL
        `;
    const result = await this._db.query(query);
    return result.rows[0].total as number;
  }

  async getDashboardCardDescriptions() {
    const query = `
            SELECT 
                (SELECT COUNT(*) FROM form_huawei WHERE deleted_at IS NULL AND is_published = true) as published_huawei,
                (SELECT COUNT(*) FROM form_kahoot WHERE deleted_at IS NULL AND is_published = true) as published_kahoot,
                (SELECT COUNT(*) FROM users WHERE deleted_at IS NULL AND created_at >= CURRENT_DATE - INTERVAL '7 days') as recent_users
        `;
    const result = await this._db.query(query);
    const data = result.rows[0];

    return {
      huawei_description: `${data.published_huawei} published`,
      kahoot_description: `${data.published_kahoot} published`,
      users_description: `${data.recent_users} new this week`,
    };
  }

  async getFormCreationTrends(months: number = 12): Promise<FormTrendData[]> {
    const query = `
            WITH month_series AS (
                SELECT generate_series(
                    DATE_TRUNC('month', CURRENT_DATE - INTERVAL '${months} months'),
                    DATE_TRUNC('month', CURRENT_DATE),
                    '1 month'::interval
                )::date AS month_date
            ),
            huawei_data AS (
                SELECT 
                    DATE_TRUNC('month', created_at) as month_date,
                    COUNT(*) as huawei_count
                FROM form_huawei 
                WHERE deleted_at IS NULL 
                AND created_at >= CURRENT_DATE - INTERVAL '${months} months'
                GROUP BY DATE_TRUNC('month', created_at)
            ),
            kahoot_data AS (
                SELECT 
                    DATE_TRUNC('month', created_at) as month_date,
                    COUNT(*) as kahoot_count
                FROM form_kahoot 
                WHERE deleted_at IS NULL 
                AND created_at >= CURRENT_DATE - INTERVAL '${months} months'
                GROUP BY DATE_TRUNC('month', created_at)
            )
            SELECT 
                TO_CHAR(ms.month_date, 'Mon') as date,
                COALESCE(hd.huawei_count, 0) as huawei_count,
                COALESCE(kd.kahoot_count, 0) as kahoot_count
            FROM month_series ms
            LEFT JOIN huawei_data hd ON ms.month_date = hd.month_date
            LEFT JOIN kahoot_data kd ON ms.month_date = kd.month_date
            ORDER BY ms.month_date
        `;
    const result = await this._db.query(query);
    return result.rows as FormTrendData[];
  }

  async getHuaweiFormAttemptStats(): Promise<FormAttemptStats[]> {
    const query = `
            SELECT 
                fh.id as form_id,
                fh.form_title,
                COUNT(DISTINCT hqa.user_id) as total_user_attempts
            FROM form_huawei fh
            LEFT JOIN huawei_quiz_attempts hqa ON fh.id = hqa.form_huawei_id
            WHERE fh.deleted_at IS NULL AND fh.is_published = true
            GROUP BY fh.id, fh.form_title
            ORDER BY total_user_attempts DESC
        `;
    const result = await this._db.query(query);
    return result.rows as FormAttemptStats[];
  }

  async getKahootFormAttemptStats(): Promise<FormAttemptStats[]> {
    const query = `
            SELECT 
                fk.id as form_id,
                fk.form_title,
                COUNT(DISTINCT kqa.user_id) as total_user_attempts
            FROM form_kahoot fk
            LEFT JOIN kahoot_quiz_attempts kqa ON fk.id = kqa.form_kahoot_id
            WHERE fk.deleted_at IS NULL AND fk.is_published = true
            GROUP BY fk.id, fk.form_title
            ORDER BY total_user_attempts DESC
        `;
    const result = await this._db.query(query);
    return result.rows as FormAttemptStats[];
  }
}
