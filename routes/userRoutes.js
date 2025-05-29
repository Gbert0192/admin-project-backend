import { Router } from "express";
import {
  getUsersController,
  getUserIdController,
  deleteUserController,
} from "../controllers/userControllers.js";
export const UserRouter = Router();

UserRouter.get("/", getUsersController);
UserRouter.get("/:id", getUserIdController);
UserRouter.delete("/:id", deleteUserController);

export default UserRouter;
