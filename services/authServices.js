import logger from "../config/logger.js";
import { handleLogin, handleRegister } from "../models/authModel.js";
export const loginUser = async (payload) => {
  try {
    const user = await handleLogin(payload);
    if (!user) {
      throw new Error("NIM atau password salah");
    }
    return {
      data: user,
    };
  } catch (error) {
    logger.console.warn(error.message);
  }
};
export const registerUser = async (payload) => {
  try {
    const user = await handleRegister(payload);
    if (!user) {
      throw new Error("NIM atau password salah");
    }
    return {
      data: user,
    };
  } catch (error) {
    logger.console.warn(error.message);
  }
};
