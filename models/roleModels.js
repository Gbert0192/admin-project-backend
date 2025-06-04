import pool from "../config/database.js";

export const findRoleByName = async (role_name) => {
  try {
    const query = "SELECT id FROM roles WHERE role_name = $1";
    const result = await pool.query(query, [role_name]);
    return result.rows[0].id;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createRole = async (role_name, permission) => {
  try {
    const query =
      "INSERT INTO roles (role_name, permission) VALUES ($1, $2) RETURNING *";
    const result = await pool.query(query, [role_name, permission]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getRolesWithPermissions = async () => {
  try {
    const query =
      "SELECT r.id, r.role_name, p.id as permission_id, p.route FROM roles r LEFT JOIN permissions p ON r.permission_id = p.id WHERE r.deleted_at IS NULL";
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateRolePermission = async (id, permission_id) => {
  try {
    const query = "UPDATE roles SET permission = $1 WHERE id =$2 RETURNING *";
    const result = await pool.query(query, [id, permission_id]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
