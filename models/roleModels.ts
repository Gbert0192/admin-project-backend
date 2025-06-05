import pool from "../config/database.js";

interface Role {
  id: number;
  role_name: string;
  permissions: number[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

interface RoleWithPermission extends Role {
  permission_id: number;
  route: string;
}

export const findRoleByName = async (role_name: string): Promise<number> => {
  try {
    const result = await pool.query(
      "SELECT id FROM roles WHERE role_name = $1 and deleted_at is null",
      [role_name]
    );
    return result.rows[0].id;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const createRole = async (role_name: string, permission: number[]): Promise<Role> => {
  try {
    const result = await pool.query(
      "INSERT INTO roles (role_name, permissions) VALUES ($1, $2) RETURNING *",
      [role_name, permission]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getRolesWithPermissions = async (): Promise<RoleWithPermission[]> => {
  try {
    const query =
      "SELECT r.id, r.role_name, p.id as permission_id, p.route FROM roles r LEFT JOIN permissions p ON r.permission_id = p.id WHERE r.deleted_at IS NULL";
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updateRolePermission = async (id: number, permission_id: number): Promise<Role | null> => {
  try {
    const query = "UPDATE roles SET permission = $1 WHERE id =$2 RETURNING *";
    const result = await pool.query(query, [id, permission_id]);
    return result.rows[0] || null;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}; 