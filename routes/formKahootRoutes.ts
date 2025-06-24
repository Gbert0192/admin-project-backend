import { Router } from "express";
import { ValidateSchema } from "../utils/validateSchema.js";
import {
  formKahootBodySchema,
  formKahootDeleteQuerySchema,
  formKahootQuerySchema,
  formKahootUpdateBodySchema,
} from "../schemas/formKahootSchema/formKahoot.schema.js";
import {
  CreateFormKahootController,
  DeleteFormKahootController,
  GetFormKahootController,
  UpdateFormKahootController,
} from "../controllers/formKahootController.js";

export const FormKahootRouter = Router();

FormKahootRouter.post(
  "/",
  ValidateSchema(formKahootBodySchema, "body"),
  CreateFormKahootController
);
FormKahootRouter.get(
  "/",
  ValidateSchema(formKahootQuerySchema, "query"),
  GetFormKahootController
);
FormKahootRouter.put(
  "/",
  ValidateSchema(formKahootUpdateBodySchema, "body"),
  UpdateFormKahootController
);
FormKahootRouter.delete(
  "/:uuid",
  ValidateSchema(formKahootDeleteQuerySchema, "params"),
  DeleteFormKahootController
);
