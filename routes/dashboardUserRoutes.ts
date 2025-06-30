import { Router } from "express";
import {
  GetAverageScoreController,
  GetNewestQuizController,
  GetQuizCompleteController,
  GetQuizHistoryController,
  GetQuizQuizCountController,
} from "../controllers/dashboardUserController.js";

export const DashboardUserRouter = Router();

DashboardUserRouter.get("/quiz-complete", GetQuizCompleteController);
DashboardUserRouter.get("/quiz-count", GetQuizQuizCountController);
DashboardUserRouter.get("/average-score", GetAverageScoreController);
DashboardUserRouter.get("/newest-quiz", GetNewestQuizController);
DashboardUserRouter.get("/history", GetQuizHistoryController);
