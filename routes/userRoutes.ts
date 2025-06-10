import { Router } from "express";
import {
  GetUserController,
  GetUserControllerByStudentId,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const UserRouter = Router();

UserRouter.get("/", GetUserController);
UserRouter.get("/:student_id", authMiddleware, GetUserControllerByStudentId);

export default UserRouter;
