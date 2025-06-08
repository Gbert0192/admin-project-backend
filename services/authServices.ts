import bcrypt from "bcrypt";
import { AuthModel } from "../models/authModel.js";
import {
  LoginSchema,
  RegisterSchema,
} from "../schemas/authSchema/auth.schema.js";
import { generateToken } from "../utils/tokenHelper.js";
import { AppError } from "../middleware/errorMiddleware.js";

export const loginUserService =
  (authModel: AuthModel) => async (payload: LoginSchema) => {
    const user = await authModel.findUser(payload.student_id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const password = payload.password;
    if (!password) {
      throw new AppError("Password is required", 403);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError("Invalid credentials", 401);
    }
    const token = await generateToken({
      user_name: user.name,
      user_id: user.uuid,
      student_id: user.student_id,
      user_uuid: user.uuid,
    });

    return { user, token, permission: [] };
  };

export const RegisterUserService =
  (authModel: AuthModel) => async (payload: RegisterSchema) => {
    const existingUser = await authModel.findUser(payload.student_id);
    if (existingUser) {
      throw new AppError("User already Exists", 400);
    }
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const newUser = await authModel.createUser({
      ...payload,
      password: hashedPassword,
    });
    return { user: newUser, message: "Registration successful" };
  };
