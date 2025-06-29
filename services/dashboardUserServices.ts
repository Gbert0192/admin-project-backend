import { DashboardUserModel } from "../models/dashboardUserModel.js";
import { UserModel } from "../models/userModel.js";

export const getQuizCompleteService = (models: {
  dashboardUserModel: DashboardUserModel;
  userModel: UserModel;
}) => {
  return async (uuid: string) => {
    const { dashboardUserModel, userModel } = models;
    const userDetails = await userModel.getDetails(uuid);
    const result = await dashboardUserModel.getQuizComplete(userDetails.id);
    return result;
  };
};
export const getQuizQuizCountService = (models: {
  dashboardUserModel: DashboardUserModel;
}) => {
  return async () => {
    const { dashboardUserModel } = models;
    const result = await dashboardUserModel.getQuizCount();
    return result;
  };
};

export const GetAverageScoreService = (models: {
  dashboardUserModel: DashboardUserModel;
  userModel: UserModel;
}) => {
  return async (uuid: string) => {
    const { dashboardUserModel, userModel } = models;
    const userDetails = await userModel.getDetails(uuid);
    const result = await dashboardUserModel.getAverageScore(userDetails.id);
    return result;
  };
};
