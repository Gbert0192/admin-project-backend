import { Router } from "express";
import {
  GetIsAllowedQuizController,
  GetQuizHistoryController,
  PostQuizController,
} from "../controllers/quizHuaweiController.js";
import { ValidateSchema } from "../utils/validateSchema.js";
import { submitQuizPayload } from "../schemas/quizHuaweiSchema/quizHuawei.schema.js";

export const QuizHuaweiRouter = Router();

QuizHuaweiRouter.get("/history", GetQuizHistoryController);
QuizHuaweiRouter.post(
  "/",
  ValidateSchema(submitQuizPayload, "body"),
  PostQuizController
);
QuizHuaweiRouter.get("/:formUuid/allowed", GetIsAllowedQuizController);
