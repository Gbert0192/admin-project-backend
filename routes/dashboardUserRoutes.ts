import { Router } from "express";
import {
  GetAverageScoreController,
  GetQuizCompleteController,
  GetQuizQuizCountController,
} from "../controllers/dashboardUserController.js";

export const DashboardUserRouter = Router();

DashboardUserRouter.get("/quiz-complete", GetQuizCompleteController);
DashboardUserRouter.get("/quiz-count", GetQuizQuizCountController);
DashboardUserRouter.get("/average-score", GetAverageScoreController);
