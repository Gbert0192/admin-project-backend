import { generateToken } from "../utils/tokenHelper.js";
import {
  LoginSchema,
  RegisterSchema,
} from "../schemas/authSchema/auth.schema.js";
import { AuthModel } from "../models/authModel.js";
import bcrypt from "bcrypt";

export const loginUserService =
  (authModel: AuthModel) => async (payload: LoginSchema) => {
    try {
      const user = await authModel.findUser(payload.student_id);
      if (!user) {
        throw new Error("User not found");
      }
      const password = payload.password;
      if (!password) {
        throw new Error("Password is required");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }
      const token = await generateToken({
        user_name: user.name,
        user_id: user.uuid,
        student_id: user.student_id,
        user_uuid: user.uuid,
      });

      return { user, token, permission: [] };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

export const RegisterUserService =
  (authModel: AuthModel) => async (payload: RegisterSchema) => {
    try {
      const existingUser = await authModel.findUser(payload.student_id);
      if (existingUser) {
        throw new Error("User already exists");
      }
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      const newUser = await authModel.createUser({
        ...payload,
        password: hashedPassword,
      });
      return { user: newUser, message: "Registration successful" };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
