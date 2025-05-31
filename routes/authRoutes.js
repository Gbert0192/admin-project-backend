import { Router } from "express";
import {
  LoginController,
  RegisterController,
} from "../controllers/authControllers.js";
export const AuthRouter = Router();

AuthRouter.post("/login", LoginController);
AuthRouter.post("/register", RegisterController);

export default AuthRouter;
