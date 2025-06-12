import { AppError } from "../middleware/errorMiddleware.js";
import { UserModel } from "../models/userModel.js";
import { PaginationInterfaceHelper } from "../utils/queryHelper.js";

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

export const getUserByStudentIdService =
  (userModel: UserModel) => async (student_id: string) => {
    try {
      const user = await userModel.getUserByStudentId(student_id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
