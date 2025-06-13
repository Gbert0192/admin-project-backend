import {
  CreateRoleQuery,
  UpdateRolePermissionPayload,
} from "../schemas/roleSchema/role.schema.js";
import { Role } from "../schemas/roleSchema/role.type.js";
import {
  createQueryParams,
  PaginationInterfaceHelper,
} from "../utils/queryHelper.js";
import { BaseModel } from "./baseModel.js";

interface JoinedRolePermission {
  route: string;
  uuid: string;
  permission_name: string;
}

interface RoleWithPermissions extends Role {
  permissions: JoinedRolePermission[];
  total: number;
}

export class RoleModel extends BaseModel {
  async findRoleByName(role_name: string) {
    const result = await this._db.query(
      `SELECT id FROM roles WHERE role_name = $1 AND deleted_at IS NULL`,
      [role_name]
    );
    return result.rows[0] as Role;
  }

  async createRole(payload: CreateRoleQuery) {
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

  async getRoles(q: PaginationInterfaceHelper) {
    const { limit = 10, page = 1, ...filters } = q;
    const offset = (page - 1) * limit;

    const { conditions, values } = createQueryParams(filters);

    const query = `
          SELECT 
        r.*, 
        COUNT(*) OVER() AS total,
        json_agg(
          json_build_object(
            'id', p.id,
            'route', p.route,
            'uuid', p.uuid,
            'permission_name', p.permission_name
          )
        ) AS permissions
      FROM roles r
      JOIN LATERAL unnest(r.permission_id) AS pid ON TRUE
      LEFT JOIN permissions p ON p.id = pid
      WHERE r.deleted_at IS NULL ${conditions}
      GROUP BY r.id
      ORDER BY r.created_at DESC
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}
    `;

    const result = await this._db.query(query, [...values, limit, offset]);
    const rows = result.rows as RoleWithPermissions[];
    const total = rows[0]?.total ?? "0";
    return {
      data: rows,
      total: Number(total),
      limit: Number(limit ?? 0),
    };
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
