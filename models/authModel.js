import pool from "../config/database.js";
import bcrypt from "bcrypt";
import { withTransaction } from "../config/transaction.js";
import { findRoleByName } from "./roleModels.js";

export const handleLogin = async (payload) => {
  try {
    const { student_id, password } = payload;
    const query = "SELECT * FROM users WHERE student_id = $1";
    const result = await pool.query(query, [student_id]);
    const user = result.rows[0];
    if (!user) {
      throw new Error("User Not Found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }
    delete user.password;
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const handleRegister = async (payload) => {
  return await withTransaction(async (client) => {
    try {
      const { password, role_name, ...others } = payload;
      const hashedPassword = await bcrypt.hash(password, 10);

      const role_id = await findRoleByName(role_name);

      const newPayload = { ...others, password: hashedPassword, role_id };

      const values = Object.values(newPayload);
      const placeholder = values.map((_, i) => `$${i + 1}`).join(", ");
      const keys = Object.keys(newPayload).join(", ");

      const query = `INSERT INTO users (${keys}) VALUES (${placeholder}) RETURNING *`;
      const result = await client.query(query, values);

      return {
        data: result.rows[0],
        message: "User Created",
        status: 201,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  });
};
