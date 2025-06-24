import { Router } from "express";
import {
  GetAverageScoreController,
  GetQuizCompleteController,
} from "../controllers/dashboardUserController.js";

export const DashboardUserRouter = Router();

DashboardUserRouter.get("/quiz-complete", GetQuizCompleteController);
DashboardUserRouter.get("/average-score", GetAverageScoreController);
