import { RegisterQuerySchema } from "../schemas/authSchema/auth.schema.js";
import { User } from "../schemas/user/user.type.js";
import { BaseModel } from "./baseModel.js";

export class AuthModel extends BaseModel {
  async findUser(student_id: string) {
    const query = `
      SELECT
        users.*,
        r.role_name as role_name
      FROM users
      JOIN roles r ON r.id = users.role_id
      WHERE users.student_id = $1 AND users.deleted_at IS NULL and r.deleted_at IS NULL
    `;
    const result = await this._db.query(query, [student_id]);
    const user = result.rows[0] as User & {
      role_name: string;
    };
    return user;
  }

  async createUser(payload: RegisterQuerySchema) {
    const value = Object.values(payload);
    const placeholder = value.map((_, i) => `$${i + 1}`).join(", ");
    const keys = Object.keys(payload).join(", ");
    const query = `INSERT INTO users (${keys}) VALUES (${placeholder}) RETURNING *`;
    const result = await this._db.query(query, value);
    const user = result.rows[0] as User;
    return user;
  }
}
