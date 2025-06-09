import pool from "../config/database.js";
import {
  CreateRolePayload,
  UpdateRolePermissionPayload,
} from "../schemas/roleSchema/role.schema.js";
import { Role } from "../schemas/roleSchema/role.type.js";

export const findRoleByName = async (role_name: string) => {
  const result = await pool.query(
    "SELECT id FROM roles WHERE role_name = $1 and deleted_at is null",
    [role_name]
  );
  return result.rows[0].id as number;
};

export const createRole = async (payload: CreateRolePayload) => {
  const result = await pool.query(
    "INSERT INTO roles (role_name, permissions) VALUES ($1, $2) RETURNING *",
    [payload.role_name, payload.permission]
  );
  return result.rows[0];
};
export const getRolesWithPermissions = async () => {
  const query =
    "SELECT r.id, r.role_name, p.id as permission_id, p.route FROM roles r LEFT JOIN permissions p ON r.permission_id = p.id WHERE r.deleted_at IS NULL";
  const result = await pool.query(query);
  return result.rows as Role[];
};

export const updateRolePermission = async (
  payload: UpdateRolePermissionPayload
) => {
  const query = "UPDATE roles SET permission = $1 WHERE id = $2 RETURNING *";
  const result = await pool.query(query, [payload.id, payload.permission_id]);
  return result.rows[0] as Role;
};
