import { Router } from "express";
import {
  ChangePasswordUserController,
  GetUserAdminController,
  GetUserController,
  GetUserControllerByStudentId,
  PromoteUserController,
  UpdateUserController,
} from "../controllers/userController.js";
import {
  changePasswordSchema,
  getUserIdSchema,
  promoteUserSchema,
  updateUserSchema,
} from "../schemas/user/user.schema.js";
import { ValidateSchema } from "../utils/validateSchema.js";

export const UserRouter = Router();

UserRouter.get(
  "/",
  ValidateSchema(getUserIdSchema, "query"),
  GetUserController
);

UserRouter.get(
  "/admin",
  ValidateSchema(getUserIdSchema, "query"),
  GetUserAdminController
);

UserRouter.get("/:student_id", GetUserControllerByStudentId);

UserRouter.put(
  "/",
  ValidateSchema(updateUserSchema, "body"),
  UpdateUserController
);

UserRouter.put(
  "/admin",
  ValidateSchema(updateUserSchema, "body"),
  UpdateUserController
);

UserRouter.put(
  "/promote",
  ValidateSchema(promoteUserSchema, "body"),
  PromoteUserController
);

UserRouter.put(
  "/change-password",
  ValidateSchema(changePasswordSchema, "body"),
  ChangePasswordUserController
);

export default UserRouter;
