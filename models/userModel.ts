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

    const { conditions, values } = createQueryParams(filters);

    const query = `
        SELECT
          users.*,
          roles.role_name,
          COUNT(*) OVER() AS total
        FROM users
        JOIN roles ON users.role_id = roles.id
        WHERE
          users.deleted_at IS NULL
          AND roles.role_name = $${values.length + 3} 
          ${conditions}
        ORDER BY users.created_at DESC
        LIMIT $${values.length + 1}
        OFFSET $${values.length + 2};
    `;

    const result = await this._db.query(query, [
      ...values,
      limit,
      offset,
      "User",
    ]);
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
