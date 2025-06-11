import { User } from "../schemas/user/user.type.js";
import {
  createQueryParams,
  PaginationInterfaceHelper,
} from "../utils/queryHelper.js";
import { BaseModel } from "./baseModel.js";

export class UserModel extends BaseModel {
  async getUsers(options: PaginationInterfaceHelper) {
    const { limit = 10, page = 1, ...filters } = options;

    const offset = (page - 1) * limit;
    console.log(filters);

    const { conditions, values } = createQueryParams(filters);

    const query = `
      SELECT *, COUNT(*) OVER() as total
      FROM users
      WHERE deleted_at is null ${conditions}
      ORDER BY created_at DESC
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}
    `;

    const result = await this._db.query(query, [...values, limit, offset]);
    const rows = result.rows as (User & { total: number })[];
    const total = rows[0]?.total ?? "0";

    return {
      data: result.rows as User[],
      total: Number(total),
      limit: Number(limit ?? 0),
    };
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
