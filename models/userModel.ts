import { User } from "../schemas/user/user.type.js";
import { BaseModel } from "./baseModel.js";

export class UserModel extends BaseModel {
  async getUsers() {
    try {
      const query = "SELECT * FROM users where deleted_at is null";
      const result = await this._db.query(query);
      return result.rows as User[];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async getUserById(id: number) {
    try {
      const query = "SELECT * FROM users WHERE id = $1";
      const { rows } = await this._db.query(query, [id]);
      return rows[0] as User;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getUserByStudentId(id: string) {
    try {
      const query = "SELECT * FROM users WHERE student_id = $1";

      const res = await this._db.query(query, [id]);

      return res.rows[0] as User;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  deleteUserById = async (id: number) => {
    try {
      const query =
        "UPDATE users SET deleted_at = NOW() WHERE id = $1 RETURNING *";
      const { rows } = await this._db.query(query, [id]);
      return rows[0] as User;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
}
