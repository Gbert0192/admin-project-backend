import { Router } from "express";
import {
  GetDashboardDataController,
  GetFormCreationTrendsController,
  GetFormAttemptStatsController,
} from "../controllers/dashboardAdminController.js";

export const DashboardAdminRouter = Router();

DashboardAdminRouter.get('/dashboard', GetDashboardDataController);
DashboardAdminRouter.get('/dashboard/form-creation-trends', GetFormCreationTrendsController);
DashboardAdminRouter.get('/dashboard/form-attempt-stats', GetFormAttemptStatsController);
