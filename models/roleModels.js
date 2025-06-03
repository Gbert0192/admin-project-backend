import pool from "../config/database.js";

export const findRoleByName = async (role_name) => {
  try {
    const result = await pool.query(
      "SELECT id FROM roles WHERE role_name = $1",
      [role_name]
    );
    return result.rows[0].id;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createRole = async (role_name, permission) => {
  try {
    const result = await pool.query(
      "INSERT INTO roles (role_name, permission) VALUES ($1, $2) RETURNING *",
      [role_name, permission]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

// optional (biar tau permission apa aja yang dimiliki role)
export const getRoleById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM roles WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
