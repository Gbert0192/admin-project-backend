import { AppError } from "../middleware/errorMiddleware.js";
import { RoleModel } from "../models/roleModel.js";
import { UserModel } from "../models/userModel.js";
import {
  ChangePasswordSchemaPayload,
  PromoteUserSchemaPayload,
  UpdateUserSchemaPayload,
} from "../schemas/user/user.schema.js";
import { PaginationInterfaceHelper } from "../utils/queryHelper.js";

import bcrypt from "bcrypt";

export const getUserService =
  (userModel: UserModel) => async (query: PaginationInterfaceHelper) => {
    const result = await userModel.getUsers(query);
    if (result.total > 0 && result.data.length === 0) {
      throw new AppError(
        "Page not found. The requested page does not exist.",
        404
      );
    }
    return {
      data: result.data,
      total: result.total,
      limit: result.limit,
    };
  };

export const getUserAdminService =
  (userModel: UserModel) => async (query: PaginationInterfaceHelper) => {
    const result = await userModel.getUserAdmins(query);
    if (result.total > 0 && result.data.length === 0) {
      throw new AppError(
        "Page not found. The requested page does not exist.",
        404
      );
    }
    return {
      data: result.data,
      total: result.total,
      limit: result.limit,
    };
  };

export const getUserByStudentIdService =
  (userModel: UserModel) => async (student_id: string) => {
    const user = await userModel.getUserByStudentId(student_id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  };

export const updateUserService =
  (userModel: UserModel) => async (payload: UpdateUserSchemaPayload) => {
    const user = await userModel.updateUser(payload);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  };

export const promoteUserService =
  (model: { userModel: UserModel; roleModel: RoleModel }) =>
  async (payload: PromoteUserSchemaPayload) => {
    const { roleModel, userModel } = model;
    const role = await roleModel.findRoleByName(payload.role_name);
    if (!role) {
      throw new AppError("Role Not Found", 404);
    }
    const user = await userModel.promoteUser({
      roleId: role.id,
      uuid: payload.uuid,
    });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  };

export const changePasswordUserService =
  (userModel: UserModel) =>
  async (payload: ChangePasswordSchemaPayload, uuid: string) => {
    if (!uuid) {
      throw new AppError("User not found", 404);
    }
    const userDetails = await userModel.getDetails(uuid);
    if (!userDetails) {
      throw new AppError("User not found", 404);
    }
    const isPasswordSame = await bcrypt.compare(
      payload.newPassword,
      userDetails.password
    );
    if (isPasswordSame) {
      throw new AppError("New Password cannot be the same as the old one", 400);
    }

    const isPasswordMatch = await bcrypt.compare(
      payload.currentPassword,
      userDetails.password
    );

    const newPassword = await bcrypt.hash(payload.newPassword, 10);
    if (!isPasswordMatch) {
      throw new AppError("Current Password is incorrect", 400);
    }
    const user = await userModel.changePasswordUser(newPassword, uuid);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  };
