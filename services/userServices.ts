import { UserModel } from "../models/userModel.js";

export const getUserService = (userModel: UserModel) => () => {
  try {
    return userModel.getUsers();
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getUserByStudentIdService =
  (userModel: UserModel) => (student_id: string) => {
    try {
      return userModel.getUserByStudentId(student_id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
