import { Router } from "express";
import { LoginController } from "../controllers/authControllers.js";

export const AuthRouter = Router();

AuthRouter.post("/sign-in", LoginController);
// AuthRouter.post("/sign-up", RegisterController);

export default AuthRouter;
