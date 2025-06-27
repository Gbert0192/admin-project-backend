import { AppError } from "../middleware/errorMiddleware.js";
import { FormHuaweiModel } from "../models/formHuaweiModel.js";
import { QuizHuaweiModel } from "../models/quizHuaweiModel.js";
import { UserModel } from "../models/userModel.js";
import { SubmitQuizPayloadType } from "../schemas/quizHuaweiSchema/quizHuawei.schema.js";

export const getQuizHistoryService = (
  quizHuaweiModel: QuizHuaweiModel,
  userModel: UserModel
) => {
  return async (user_uuid: string) => {
    const userId = await userModel.getDetails(user_uuid);
    const quiz = await quizHuaweiModel.getHistory(userId.id);
    if (!quiz) {
      throw new AppError("Failed to get Form", 401);
    }
    return quiz;
  };
};

export const postQuizService = (model: {
  userModel: UserModel;
  quizHuaweiModel: QuizHuaweiModel;
  formHuaweiModel: FormHuaweiModel;
}) => {
  return async (payload: SubmitQuizPayloadType, user_uuid: string) => {
    const { formHuaweiModel, quizHuaweiModel, userModel } = model;

    const userDetail = await userModel.getDetails(user_uuid);
    const formDetail = await formHuaweiModel.getDetails(payload.form_uuid);
    const filteredQuizPayload = {
      score: payload.score,
      duration_seconds: payload.duration_seconds,
      user_id: userDetail.id,
      form_huawei_id: formDetail.id,
    };
    const questionUuids = payload.attempt_answers.map(
      (answer) => answer.question_uuid
    );
    const questionsIdResult = await formHuaweiModel.getIdQuestionsByUuidBulk(
      questionUuids
    );
    const uuidToIdMap = new Map<string, number>();
    for (const question of questionsIdResult) {
      uuidToIdMap.set(question.uuid, question.id);
    }

    const filteredAnswerPayload = payload.attempt_answers.map((answer) => {
      const questionId = uuidToIdMap.get(answer.question_uuid);

      if (!questionId) {
        throw new AppError(
          `Internal Error: UUID for a question was not found.`,
          404
        );
      }

      return {
        question_id: questionId,
        user_answer: answer.user_answer,
        is_correct: answer.is_correct,
      };
    });

    const quiz = await quizHuaweiModel.create(
      filteredQuizPayload,
      filteredAnswerPayload
    );

    if (!quiz) {
      throw new AppError("Failed to save quiz attempt", 500);
    }

    return quiz;
  };
};
