import { Router } from "express";
import {
  GetUserController,
  GetUserControllerByStudentId,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { ValidateSchema } from "../utils/validateSchema.js";
import {
  GetUserIdSchema,
  getUserIdSchema,
} from "../schemas/user/user.schema.js";
import { Request, Response } from "express";

export const UserRouter = Router();

UserRouter.get(
  "/",
  authMiddleware,
  ValidateSchema(getUserIdSchema, "query"),
  GetUserController
);

UserRouter.get("/:student_id", authMiddleware, GetUserControllerByStudentId);

export default UserRouter;
