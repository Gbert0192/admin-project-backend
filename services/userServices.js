import { getUsers, getUserById, deleteUserById } from "../models/userModel.js";
import logger from "../config/logger.js";

export const getAllUsers = async () => {
  try {
    const users = await getUsers();

    if (!users || users.length === 0) {
      return [];
    }

    return users;
  } catch (error) {
    logger.warn(error.message);
    throw error; // lempar error ke controller (biar controller tau ada error)
  }
};

export const getUserId = async (id) => {
  try {
    const userId = await getUserById(id);

    if (!userId) {
      throw new Error("User not found");
    }

    return {
      data: userId,
      message: "User found successfully",
    };
  } catch (error) {
    logger.warn(error.message);
    throw error;
  }
};

export const deletedUser = async (id) => {
  try {
    const deleteUser = await deleteUserById(id);
    if (!deleteUser) {
      throw new Error("User not found");
    }

    return {
      data: deleteUser,
      message: "User deleted successfully",
    };
  } catch (error) {
    logger.warn(error.message);
    throw error;
  }
};
