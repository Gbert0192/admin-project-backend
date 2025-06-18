import { Router } from "express";

import { CreateFormController } from "../controllers/formController.js";
import { formBodySchema } from "../schemas/formSchema/form.schema.js";
import { ValidateSchema } from "../utils/validateSchema.js";

export const FormRouter = Router();

FormRouter.post(
  "/",
  ValidateSchema(formBodySchema, "body"),
  CreateFormController
);
