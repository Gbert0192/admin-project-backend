import { AppError } from "../middleware/errorMiddleware.js";
import { UserModel } from "../models/userModel.js";

// user.service.ts
export const getUserService =
  (userModel: UserModel) => async (limit: number, offset: number) => {
    const users = await userModel.getUsers(limit, offset);

    if (users.total && users.data.length === 0) {
      throw new AppError("Page not found", 404);
    }

    return { users, total: users.total };
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
