import {
  CreateRolePayload,
  UpdateRolePermissionPayload,
} from "../schemas/roleSchema/role.schema.js";
import { Role } from "../schemas/roleSchema/role.type.js";
import { BaseModel } from "./baseModel.js";

export class RoleModel extends BaseModel {
  async findRoleByName(role_name: string) {
    const result = await this._db.query(
      `SELECT id FROM roles WHERE role_name = $1 AND deleted_at IS NULL`,
      [role_name]
    );
    return result.rows[0] as Role;
  }

  async createRole(payload: CreateRolePayload) {
    const query = `
      INSERT INTO roles (role_name, permission_id)
      VALUES ($1, $2::bigint[])
      RETURNING *
    `;
    const result = await this._db.query(query, [
      payload.role_name,
      payload.permissions,
    ]);
    return result.rows[0] as Role;
  }

  async getRoles() {
    const query = `
    select * from roles where deleted_at is null
    `;
    const result = await this._db.query(query);
    return result.rows as Role[];
  }

  async updateRolePermission(payload: UpdateRolePermissionPayload) {
    const { permission_id, role_name, uuid } = payload;
    const query = `
      UPDATE roles
      SET permission_id = $2::bigint[], role_name = $1
      WHERE uuid = $3
      RETURNING *
    `;
    const result = await this._db.query(query, [
      role_name,
      permission_id,
      uuid,
    ]);
    return result.rows[0] as Role;
  }

  async deleteRole(uuid: string) {
    const query = `
      UPDATE roles
      SET deleted_at = NOW()
      WHERE id = $1
      RETURNING *
    `;
    const result = await this._db.query(query, [uuid]);
    return result.rows[0];
  }
}
