import { Router } from "express";
import {
  GetUserController,
  GetUserControllerByStudentId,
} from "../controllers/userController.js";

export const UserRouter = Router();

UserRouter.get("/", GetUserController);
UserRouter.get("/:student_id", GetUserControllerByStudentId);

export default UserRouter;
