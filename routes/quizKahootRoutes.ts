import { Router } from "express";
import { SubmitKahootAttemptController, GetKahootHistoryController } from "../controllers/quizKahootController.js";
import { ValidateSchema } from "../utils/validateSchema.js";
import { submitKahootAttemptSchema } from "../schemas/quizKahootSchema/quizKahoot.schema.js";

export const QuizKahootRouter = Router();

QuizKahootRouter.post(
  "/",
  ValidateSchema(submitKahootAttemptSchema, "body"),
  SubmitKahootAttemptController
);

QuizKahootRouter.get("/history", GetKahootHistoryController);