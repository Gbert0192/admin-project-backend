import { BaseModel } from "./baseModel.js";

export class DashboardUserModel extends BaseModel {
  async getQuizComplete(uuid: string) {
    const query = `
    QUERY WAS OTW
    `;
    const result = await this._db.query(query, [uuid]);
    const rows = result.rows[0];
    return rows as number;
  }
  async getAverageScore(uuid: string) {
    const query = `
    QUERY WAS OTW
    `;
    const result = await this._db.query(query, [uuid]);
    const rows = result.rows[0];
    return rows as number;
  }
}
