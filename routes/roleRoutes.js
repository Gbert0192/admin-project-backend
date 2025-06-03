import { Router } from "express";
import {
  createRoleController,
  getRoleByIdController,
} from "../controllers/roleControllers.js";
export const RoleRouter = Router();

RoleRouter.post("/", createRoleController);
RoleRouter.get("/:id", getRoleByIdController);
