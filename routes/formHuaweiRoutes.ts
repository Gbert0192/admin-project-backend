import { Router } from "express";

import {
  CreateFormHuaweiController,
  GetFormHuaweiController,
} from "../controllers/formHuaweiController.js";
import {
  formHuaweiBodySchema,
  formHuaweiDeleteQuerySchema,
  formHuaweiQuerySchema,
} from "../schemas/formSchema/form.schema.js";
import { ValidateSchema } from "../utils/validateSchema.js";

export const FornHuaweiRouter = Router();

FornHuaweiRouter.post(
  "/",
  ValidateSchema(formHuaweiBodySchema, "body"),
  CreateFormHuaweiController
);

FornHuaweiRouter.get(
  "/",
  ValidateSchema(formHuaweiQuerySchema, "query"),
  GetFormHuaweiController
);

FornHuaweiRouter.delete(
  "/:uuid",
  ValidateSchema(formHuaweiDeleteQuerySchema, "query"),
  GetFormHuaweiController
);
