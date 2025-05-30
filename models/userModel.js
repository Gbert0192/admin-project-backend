import pool from "../config/database.js";

// Get all users
export const getUsers = async () => {
  try {
    const result = await pool.query(
      "SELECT * FROM users where deleted_at is null"
    );
    return result;
  } catch (error) {
    return error.message;
  }
};

export const getUserById = async (id) => {
  try {
    const query = "SELECT * FROM users WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    return error.message;
  }
};

export const deleteUserById = async (id) => {
  try {
    const query =
      "UPDATE users SET deleted_at = NOW() WHERE id = $1 RETURNING *";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    return error.message;
  }
};
