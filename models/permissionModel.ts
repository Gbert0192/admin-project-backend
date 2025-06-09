import {
  PermissionBodySchema,
  PermissionUpdatePayloadSchema,
} from "../schemas/permissionSchema/permission.schema.js";
import { Permission } from "../schemas/permissionSchema/permission.type.js";
import { BaseModel } from "./baseModel.js";

export class PermissionModel extends BaseModel {
  async createPermission(payload: PermissionBodySchema) {
    const query = `
      INSERT INTO permissions (route, permission_name)
      VALUES ($1, $2)
      RETURNING *
    `;
    const result = await this._db.query(query, [
      payload.route,
      payload.permission_name,
    ]);
    return result.rows[0] as Permission;
  }

  async getAllPermissions() {
    const query = "SELECT * FROM permissions WHERE deleted_at IS NULL";
    const result = await this._db.query(query);
    return result.rows as Permission[];
  }

  async getPermissionById(uuid: string) {
    const query =
      "SELECT * FROM permissions WHERE uuid = $1 and deleted_at IS NULL";
    const result = await this._db.query(query, [uuid]);
    return result.rows[0] as Permission;
  }

  async updatePermission(payload: PermissionUpdatePayloadSchema) {
    const { route, uuid } = payload;
    const query = `
      UPDATE permissions
      SET route = $1
      WHERE uuid = $2
      RETURNING *
    `;
    const result = await this._db.query(query, [route, uuid]);
    return result.rows[0] ?? null;
  }

  async deletePermission(uuid: string) {
    const query =
      "update permissions SET deleted_at = NOW() WHERE uuid = $1 RETURNING *";
    const result = await this._db.query(query, [uuid]);
    return result.rows[0] || null;
  }
}
