import { AppError } from "../middleware/errorMiddleware.js";
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

export const GetQuizHistoryService = (models: {
  dashboardUserModel: DashboardUserModel;
  userModel: UserModel;
}) => {
  return async (uuid: string) => {
    const { dashboardUserModel, userModel } = models;
    const userDetails = await userModel.getDetails(uuid);
    const result = await dashboardUserModel.getQuizHistory(userDetails.id);
    return result;
  };
};

export const GetNewestQuizService = (models: {
  dashboardUserModel: DashboardUserModel;
  userModel: UserModel;
}) => {
  return async (userUuid: string) => {
    const { dashboardUserModel, userModel } = models;
    const userDetails = await userModel.getDetails(userUuid);
    const result = await dashboardUserModel.getNewestQuiz(userDetails.id);
    if (!result) {
      throw new AppError("No quiz found", 404);
    }
    return result;
  };
};
