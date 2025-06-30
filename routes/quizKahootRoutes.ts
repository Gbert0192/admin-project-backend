import { Router } from "express";
import { PostQuizKahootController, GetKahootHistoryController, GetIsAllowedQuizController } from "../controllers/quizKahootController.js";
import { ValidateSchema } from "../utils/validateSchema.js";
import { submitKahootAttemptSchema } from "../schemas/quizKahootSchema/quizKahoot.schema.js";

export const QuizKahootRouter = Router();

QuizKahootRouter.post(
  "/",
  ValidateSchema(submitKahootAttemptSchema, "body"),
  PostQuizKahootController
);
QuizKahootRouter.get("/history", GetKahootHistoryController);
QuizKahootRouter.get("/:formUuid/allowed", GetIsAllowedQuizController);