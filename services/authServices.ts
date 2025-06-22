import bcrypt from "bcrypt";
import { AuthModel } from "../models/authModel.js";
import {
  LoginSchema,
  RegisterSchema,
} from "../schemas/authSchema/auth.schema.js";
import { generateToken } from "../utils/tokenHelper.js";
import { AppError } from "../middleware/errorMiddleware.js";
import { RoleModel } from "../models/roleModel.js";

export const loginUserService =
  (model: { authModel: AuthModel; roleModel: RoleModel }) =>
  async (payload: LoginSchema) => {
    const { authModel, roleModel } = model;
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

    const permission = await roleModel.getRolePermissionById(user.role_id);
    const menus = await roleModel.getRoleMenusById(user.role_id);

    const token = await generateToken({
      user_name: user.name,
      uuid: user.uuid,
      student_id: user.student_id,
    });

    return {
      user,
      token,
      permission: permission.permissions,
      menus: menus.menus,
    };
  };

export const RegisterUserService =
  (model: { authModel: AuthModel; roleModel: RoleModel }) =>
  async (payload: RegisterSchema) => {
    const { authModel, roleModel } = model;
    const existingUser = await authModel.findUser(payload.student_id);
    if (existingUser) {
      throw new AppError("User already Exists", 400);
    }
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const roleId = await roleModel.findRoleByName(payload.role_name);
    const newUser = await authModel.createUser({
      student_id: payload.student_id,
      name: payload.name,
      role_id: roleId.id,
      password: hashedPassword,
    });
    return { user: newUser, message: "Registration successful" };
  };
