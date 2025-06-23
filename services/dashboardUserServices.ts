import { DashboardUserModel } from "../models/dashboardUserModel.js";

export const getQuizCompleteService = (
  dashboardUserModel: DashboardUserModel
) => {
  return async (uuid: string) => {
    const result = await dashboardUserModel.getQuizComplete(uuid);
    return result;
  };
};

export const GetAverageScoreService = (
  dashboardUserModel: DashboardUserModel
) => {
  return async (uuid: string) => {
    const result = await dashboardUserModel.getAverageScore(uuid);
    //TODO: get jumlah form & scoore, terus nnti itung sendiri

    return result;
  };
};
