import pool from "../config/database.js";

export const createPermission = async (route) => {
  try {
    const query = "INSERT INTO permissions (route) VALUES ($1) RETURNING *";
    const result = await pool.query(query, [route]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllPermissions = async () => {
  try {
    const query = "SELECT * FROM permissions WHERE deleted_at IS NULL";
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPermissionById = async (id) => {
  try {
    const query = "SELECT * FROM permissions WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updatePermission = async (id, route) => {
  try {
    const query = "UPDATE permissions SET route = $1 WHERE id = $2 RETURNING *";
    const result = await pool.query(query, [route, id]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deletePermission = async (id) => {
  try {
    const query = "DELETE FROM permissions WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
