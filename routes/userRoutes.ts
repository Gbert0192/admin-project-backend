import { Router } from "express";
import {
  GetUserController,
  GetUserControllerByStudentId,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getUserIdSchema } from "../schemas/user/user.schema.js";
import { ValidateSchema } from "../utils/validateSchema.js";

export const UserRouter = Router();

UserRouter.get(
  "/",
  ValidateSchema(getUserIdSchema, "query"),
  GetUserController
);

UserRouter.get("/:student_id", authMiddleware, GetUserControllerByStudentId);

export default UserRouter;
