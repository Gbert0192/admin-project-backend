import pool from "../config/database.js";
import bcrypt from "bcrypt";

export const handleLogin = async (payload) => {
  try {
    const { nim, password } = payload;
    const query = "SELECT * FROM users WHERE nim = ?";
    const [result] = await pool.query(query, [nim]);

    const user = result[0];
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
  try {
    const { password, ...others } = payload;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPayload = { ...others, password: hashedPassword };

    const values = Object.values(newPayload);
    const placeholder = values.map(() => "?").join(", ");
    const keys = Object.keys(newPayload).join(", ");

    const query = `INSERT INTO users (${keys}) VALUES (${placeholder})`;
    const [result] = await pool.query(query, values);
    return result[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
