import pool from "../config/database.js";

// Get all users
export const getUsers = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    return error.message;
  }
};

// Get user by id
export const getUserById = async (id) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return rows[0];
  } catch (error) {
    return error.message;
  }
};

// Create a new user (perhaps manually by admin)
// Update user data

// Delete user by id
export const deleteUserById = async (id) => {
  try {
    const { rows } = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return rows[0];
  } catch (error) {
    return error.message;
  }
};
