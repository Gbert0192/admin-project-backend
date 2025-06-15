import {
  PermissionBodySchema,
  PermissionUpdatePayloadSchema,
} from "../schemas/permissionSchema/permission.schema.js";
import { Permission } from "../schemas/permissionSchema/permission.type.js";
import { createQueryParams, PaginationInterfaceHelper } from "../utils/queryHelper.js";
import { BaseModel } from "./baseModel.js";

export class PermissionModel extends BaseModel {
  async createPermission(payload: PermissionBodySchema) {
    const query = `
      INSERT INTO permissions (route, permission_name, method)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await this._db.query(query, [
      payload.route,
      payload.permission_name,
      payload.method,
    ]);
    return result.rows[0] as Permission;
  }

  async getAllPermissions(options: PaginationInterfaceHelper) {
    const { limit = 10, page = 1, ...filters } = options;
    const offset = (page - 1) * limit;

    const { conditions, values } = createQueryParams(filters);

    const query = `SELECT *, COUNT(*) OVER() as total FROM permissions WHERE deleted_at IS NULL ${conditions} ORDER BY created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;

    const result = await this._db.query(query, [...values, limit, offset]);
    const rows = result.rows as (Permission & {total: number})[];
    const total = rows[0]?.total ?? "0";

    return {
      data: result.rows as Permission[],
      total: Number(total),
      limit: Number(limit ?? 0),
    };
  }

  async getPermissionById(uuid: string) {
    const query =
      "SELECT * FROM permissions WHERE uuid = $1 and deleted_at IS NULL";
    const result = await this._db.query(query, [uuid]);
    return result.rows[0] as Permission;
  }

  async updatePermission(payload: PermissionUpdatePayloadSchema) {
    const { route, uuid, permission_name } = payload;
    const query = `
      UPDATE permissions
      SET route = $1, permission_name = $2
      WHERE uuid = $3
      RETURNING *
    `;
    const result = await this._db.query(query, [route,permission_name, uuid]);
    return result.rows[0] ?? null;
  }

  async deletePermission(uuid: string) {
    const query =
      "update permissions SET deleted_at = NOW() WHERE uuid = $1 RETURNING *";
    const result = await this._db.query(query, [uuid]);
    return result.rows[0] || null;
  }

  async getIdByUuidBulk(uuids: string[]) {
    const placeholders = uuids.map((_, i) => `$${i + 1}`).join(", ");
    const query = `SELECT id FROM permissions WHERE uuid IN (${placeholders})`;
    const result = await this._db.query(query, uuids);
    const ids = result.rows.map((row) => row.id);
    return ids as number[];
  }
}
