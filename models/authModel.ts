import bcrypt from "bcrypt";

import {
  LoginSchema,
  RegisterSchema,
} from "../schemas/authSchema/auth.schema.js";
import { BaseModel } from "./baseModel.js";
import { AppError } from "../middleware/errorMiddleware.js";
import { User } from "../schemas/user/user.type.js";

// interface LoginPayload {
//   student_id: string;
//   password: string;
// }

// interface RegisterPayload {
//   password: string;P
//   [key: string]: any;
// }

// interface User {
//   id: number;
//   student_id: string;
//   password: string;
//   [key: string]: any;
// }

// export const handleLoginModel = async (
//   payload: LoginPayload
// ): Promise<Omit<User, "password">> => {
//   try {
//     const { student_id, password } = payload;
//     const query = "SELECT * FROM users WHERE student_id = $1";
//     const result = await pool.query(query, [student_id]);
//     const user = result.rows[0] as User;
//     if (!user) {
//       throw new Error("User Not Found");
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       throw new Error("Invalid Credentials");
//     }
//     const { password: _, ...userWithoutPassword } = user;
//     return userWithoutPassword;
//   } catch (error) {
//     throw new Error((error as Error).message);
//   }
// };

// export const handleRegisterModel = async (
//   payload: RegisterPayload,
//   db: Pool
// ) => {
//   try {
//     const { password, ...others } = payload;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newPayload = { ...others, password: hashedPassword };

//     const values = Object.values(newPayload);
//     const placeholder = values.map((_, i) => `$${i + 1}`).join(", ");
//     const keys = Object.keys(newPayload).join(", ");

//     const query = `INSERT INTO users (${keys}) VALUES (${placeholder}) RETURNING *`;
//     const result = await db.query(query, values);

//     return {
//       data: result.rows[0],
//       message: "User Created",
//       status: 201,
//     };
//   } catch (error) {
//     throw new AppError((error as Error).message, 400);
//   }
// };

export class AuthModel extends BaseModel {
  async findUser(student_id: string) {
    const query = "SELECT * FROM users WHERE student_id = $1";
    const result = await this._db.query(query, [student_id]);
    const user = result.rows[0] as User;
    return user;
  }

  async createUser(payload: RegisterSchema) {
    const value = Object.values(payload);
    const placeholder = value.map((_, i) => `$${i + 1}`).join(", ");
    const keys = Object.keys(payload).join(", ");
    const query = `INSERT INTO users (${keys}) VALUES (${placeholder}) RETURNING *`;
    const result = await this._db.query(query, value);
    const user = result.rows[0] as User;
    return user;
  }
}
