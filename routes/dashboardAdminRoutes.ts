import { Router } from "express";
import {
  GetDashboardDataController,
} from "../controllers/dashboardAdminController.js";

export const DashboardAdminRouter = Router();

DashboardAdminRouter.get('/dashboard', GetDashboardDataController);
