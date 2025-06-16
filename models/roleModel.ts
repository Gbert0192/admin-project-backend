import {
  CreateRoleQuery,
  UpdateRolePermissionQuery,
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

interface UserPermission {
  route: string;
  method: string[];
}
interface UserRoleWithPermission extends Role {
  permissions: UserPermission[];
}

interface RoleWithPermissions extends Role {
  permissions: JoinedRolePermission[];
  total: number;
}

interface UserRoleWithMenus {
  menus: string[];
}

export class RoleModel extends BaseModel {
  async findRoleByName(role_name: string) {
    const result = await this._db.query(
      `SELECT * FROM roles WHERE role_name = $1 AND deleted_at IS NULL`,
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
            'route', p.route,
            'uuid', p.uuid,
            'is_menu', p.is_menu,
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

  async updateRolePermission(payload: UpdateRolePermissionQuery) {
    const { permissions, role_name, uuid } = payload;
    const query = `
      UPDATE roles
      SET permission_id = $2::bigint[], role_name = $1
      WHERE uuid = $3
      RETURNING *
    `;
    const result = await this._db.query(query, [role_name, permissions, uuid]);
    return result.rows[0] as Role;
  }

  async deleteRole(uuid: string) {
    const query = `
      UPDATE roles
      SET deleted_at = NOW()
      WHERE uuid = $1
      RETURNING *
    `;
    const result = await this._db.query(query, [uuid]);
    return result.rows[0];
  }

  async getRolePermissionById(id: number) {
    const query = `
    SELECT
        r.*,
        json_agg(
          json_build_object(
            'route', p.route,
            'method', to_json(p.method)
          )
        ) AS permissions
      FROM
        roles r
      LEFT JOIN
        permissions p ON p.id = ANY(r.permission_id)
      WHERE
        r.id = $1 and is_menu = false
      GROUP BY
        r.id;
    `;
    const result = await this._db.query(query, [id]);
    return result.rows[0] as UserRoleWithPermission;
  }
  async getRoleMenusById(id: number) {
    const query = `
    SELECT
      COALESCE(
        json_agg(p.route) FILTER (WHERE p.id IS NOT NULL),
        '[]'
      ) AS menus
    FROM
      roles r
    LEFT JOIN
      permissions p ON p.id = ANY(r.permission_id) AND p.is_menu = true
    WHERE
      r.id = $1
    GROUP BY
      r.id;
    `;

    const result = await this._db.query(query, [id]);
    return result.rows[0] as UserRoleWithMenus;
  }
}
