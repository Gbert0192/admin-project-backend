import { Router } from "express";

import {
  CreateFormHuaweiController,
  CreateFormHuaweiQuestionController,
  DeleteFormHuaweiController,
  DeleteFormHuaweiQuestionController,
  GetFormHuaweiController,
  GetFormHuaweiDetailController,
  GetFormHuaweiQuestionController,
  GetFormHuaweiQuizQuestionController,
  GetPublishedFormHuaweiController,
  PublishFormHuaweiController,
  UnPublishFormHuaweiController,
  UpdateFormHuaweiController,
  UpdateFormHuaweiQuestionController,
} from "../controllers/formHuaweiController.js";
import {
  formHuaweiBodySchema,
  formHuaweiDeleteQuerySchema,
  formHuaweiQuerySchema,
  formHuaweiQuestionQuerySchema,
  formHuaweiUpdateBodySchema,
  publishFormBodySchema,
  questionsHuaweiBodySchema,
  questionsHuaweiUpdateBodySchema,
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

FormHuaweiRouter.get("/published", GetPublishedFormHuaweiController);

FormHuaweiRouter.get("/:formUuid", GetFormHuaweiDetailController);

FormHuaweiRouter.delete(
  "/:uuid",
  ValidateSchema(formHuaweiDeleteQuerySchema, "params"),
  DeleteFormHuaweiController
);

//questions
FormHuaweiRouter.post(
  "/question/:formUuid",
  ValidateSchema(questionsHuaweiBodySchema, "body"),
  CreateFormHuaweiQuestionController
);

FormHuaweiRouter.get(
  "/question/:formUuid",
  ValidateSchema(formHuaweiQuestionQuerySchema, "query"),
  GetFormHuaweiQuestionController
);

FormHuaweiRouter.put(
  "/question",
  ValidateSchema(questionsHuaweiUpdateBodySchema, "body"),
  UpdateFormHuaweiQuestionController
);

FormHuaweiRouter.post(
  "/publish",
  ValidateSchema(publishFormBodySchema, "body"),
  PublishFormHuaweiController
);

FormHuaweiRouter.put(
  "/unpublish/:formUuid",
  ValidateSchema(formHuaweiDeleteQuerySchema, "params"),
  UnPublishFormHuaweiController
);

FormHuaweiRouter.delete(
  "/question/:questionUuid",
  DeleteFormHuaweiQuestionController
);

//user
FormHuaweiRouter.get("/quiz/:formUuid", GetFormHuaweiQuizQuestionController);
