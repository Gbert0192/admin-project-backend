import { loginSchema, registerSchema } from "../schemas/authSchema.js";
import { loginUser, registerUser } from "../services/authServices.js";
import { ValidateSchema } from "../utils/validateSchema.js";

export const LoginController = async (req, res) => {
  try {
    const body = ValidateSchema(loginSchema, req);
    const user = await loginUser(body);
    res.send(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const RegisterController = async (req, res) => {
  try {
    const body = ValidateSchema(registerSchema, req);
    const user = await registerUser(body);
    res.send(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
