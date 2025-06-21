import { Router } from "express";

import {
  CreateFormHuaweiController,
  CreateFormHuaweiQuestionController,
  DeleteFormHuaweiController,
  GetFormHuaweiController,
  UpdateFormHuaweiController,
} from "../controllers/formHuaweiController.js";
import {
  formHuaweiBodySchema,
  formHuaweiDeleteQuerySchema,
  formHuaweiQuerySchema,
  formHuaweiUpdateBodySchema,
  questionsHuaweiBodySchema,
} from "../schemas/formHuaweiSchema/formHuawei.schema.js";
import { ValidateSchema } from "../utils/validateSchema.js";

export const FormHuaweiRouter = Router();

FormHuaweiRouter.post(
  "/",
  ValidateSchema(formHuaweiBodySchema, "body"),
  CreateFormHuaweiController
);

FormHuaweiRouter.put(
  "/",
  ValidateSchema(formHuaweiUpdateBodySchema, "body"),
  UpdateFormHuaweiController
);

FormHuaweiRouter.get(
  "/",
  ValidateSchema(formHuaweiQuerySchema, "query"),
  GetFormHuaweiController
);

FormHuaweiRouter.delete(
  "/:uuid",
  ValidateSchema(formHuaweiDeleteQuerySchema, "params"),
  DeleteFormHuaweiController
);

FormHuaweiRouter.post(
  "/question/:formUuid",
  ValidateSchema(questionsHuaweiBodySchema, "body"),
  CreateFormHuaweiQuestionController
);
