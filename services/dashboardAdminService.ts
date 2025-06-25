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