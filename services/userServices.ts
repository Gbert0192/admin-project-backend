import { UserModel } from "../models/userModel.js";

export const getUserService = (userModel: UserModel) => () => {
  try {
    return userModel.getUsers();
  } catch (error) {
    throw new Error((error as Error).message);
  }
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
