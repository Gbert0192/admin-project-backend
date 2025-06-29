import { DashboardAdminModel } from '../models/dashboardAdminModel.js';

export const getTotalHuaweiFormsService = (
  dashboardAdminModel: DashboardAdminModel) => {
    return async () => {
        const result = await dashboardAdminModel.getTotalHuaweiForms();
        return result;
  };
};

export const getTotalKahootFormsService = (
  dashboardAdminModel: DashboardAdminModel) => {
    return async () => {
        const result = await dashboardAdminModel.getTotalKahootForms();
        return result;
  };
};

export const getTotalUsersService = (
  dashboardAdminModel: DashboardAdminModel) => {
    return async () => {
        const result = await dashboardAdminModel.getTotalUsers();
        return result;
  };
};

export const getDashboardCardDescriptionsService = (
  dashboardAdminModel: DashboardAdminModel) => {
    return async () => {
        const result = await dashboardAdminModel.getDashboardCardDescriptions();
        return result;
    };
};

export const getFormCreationTrendsService = (
  dashboardAdminModel: DashboardAdminModel) => {
    return async (months: number = 12) => {
        const result = await dashboardAdminModel.getFormCreationTrends(months);
        return result;
    };
};

export const getHuaweiFormAttemptStatsService = (
  dashboardAdminModel: DashboardAdminModel) => {
    return async () => {
        const result = await dashboardAdminModel.getHuaweiFormAttemptStats();
        return result;
    };
};

export const getKahootFormAttemptStatsService = (
  dashboardAdminModel: DashboardAdminModel) => {
    return async () => {
        const result = await dashboardAdminModel.getKahootFormAttemptStats();
        return result;
    };
};