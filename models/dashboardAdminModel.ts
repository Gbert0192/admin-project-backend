import { BaseModel } from "./baseModel.js";

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
}