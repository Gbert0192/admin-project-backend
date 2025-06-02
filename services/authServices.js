import { handleLogin, handleRegister } from "../models/authModel.js";
import { generateToken } from "../utils/tokenHelper.js";
export const loginUser = async (payload) => {
  try {
    const user = await handleLogin(payload);
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const token = await generateToken({
      user_name: user.name,
      user_id: user.uuid,
      student_id: user.student_id,
    });

    return { user, token, permission: [] };
  } catch (error) {
    throw new Error(error.message);
  }
};
export const registerUser = async (payload) => {
  try {
    const user = await handleRegister(payload);
    return {
      data: user,
    };
  } catch (error) {
    return error.message;
  }
};
