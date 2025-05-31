import { loginSchema, registerSchema } from "../schemas/authSchema.js";
import { loginUser, registerUser } from "../services/authServices.js";
import { ValidateSchema } from "../utils/validateSchema.js";

export const LoginController = async (req, res) => {
  try {
    const body = ValidateSchema(loginSchema, req.body);
    const user = await loginUser(body);
    res.send({ data: user, code: 200, message: "Login Successful" });
  } catch (error) {
    res.status(400).json({ data: null, message: error.message, code: 400 });
  }
};

export const RegisterController = async (req, res) => {
  try {
    const body = ValidateSchema(registerSchema, req.body);
    const user = await registerUser(body);
    res.send(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
