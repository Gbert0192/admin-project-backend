import { Router } from "express";
import { ValidateSchema } from "../utils/validateSchema.js";
import { formKahootBodySchema, formKahootDeleteQuerySchema, formKahootQuerySchema, formKahootUpdateBodySchema, questionKahootQuerySchema, questionsKahootBodySchema, questionsKahootUpdateBodySchema } from "../schemas/formKahootSchema/formKahoot.schema.js";
import { CreateFormKahootController, CreateFormKahootQuestionController, DeleteFormKahootController, GetFormKahootController, GetFormKahootQuestionController, UpdateFormKahootController, UpdateFormKahootQuestionController } from "../controllers/formKahootController.js";


export const FormKahootRouter = Router();

FormKahootRouter.post('/', ValidateSchema(formKahootBodySchema, 'body'), CreateFormKahootController);
FormKahootRouter.get('/', ValidateSchema(formKahootQuerySchema, "query"), GetFormKahootController);
FormKahootRouter.put('/', ValidateSchema(formKahootUpdateBodySchema, "body"), UpdateFormKahootController);
FormKahootRouter.delete('/:uuid',ValidateSchema(formKahootDeleteQuerySchema, "params"), DeleteFormKahootController);

// Question
FormKahootRouter.post(
  "/question/:formUuid",
  ValidateSchema(questionsKahootBodySchema, "body"),
  CreateFormKahootQuestionController
);

FormKahootRouter.get(
  "/question/:formUuid",
  ValidateSchema(questionKahootQuerySchema, "query"),
  GetFormKahootQuestionController
);

FormKahootRouter.put(
  "/question",
  ValidateSchema(questionsKahootUpdateBodySchema, "body"),
  UpdateFormKahootQuestionController
);