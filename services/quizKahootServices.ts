import { AppError } from "../middleware/errorMiddleware.js";
import { FormKahootModel } from "../models/formKahootModel.js";
import { QuizKahootModel } from "../models/quizKahootModel.js";
import { UserModel } from "../models/userModel.js";
import { SubmitKahootAttemptSchema } from "../schemas/quizKahootSchema/quizKahoot.schema.js";

export const postQuizKahootService = (model: {
  quizKahootModel: QuizKahootModel;
  userModel: UserModel;
  formKahootModel: FormKahootModel;
}) => {
  return async (payload: SubmitKahootAttemptSchema, user_uuid: string) => {
    const { quizKahootModel, userModel, formKahootModel } = model;

    const userDetail = await userModel.getDetails(user_uuid);

    const formDetail = await formKahootModel.getAllDataFormKahoots(
      payload.form_uuid
    );

    const questionUuids = payload.attempt_answers.map(
      (answer) => answer.question_uuid
    );

    const questionsIdResult = await formKahootModel.getIdQuestionsByUuidBulk(
      questionUuids
    );

    const uuidToIdMap = new Map<string, number>();
    for (const question of questionsIdResult) {
      uuidToIdMap.set(question.uuid, question.id);
    }

    const answersWithId = payload.attempt_answers.map((answer) => {
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
        answered_at: answer.answered_at,
        question_started_at: answer.question_started_at,
        duration: answer.duration,
      };
    });

    const finalScore = payload.score;

    const quizAttemptData = {
      form_kahoot_id: formDetail.id,
      user_id: userDetail.id,
      score: finalScore,
      duration_seconds: payload.duration_seconds,
      submitted_at: new Date(payload.submitted_at),
    };

    const attempt = await quizKahootModel.createQuizAttempt(
      quizAttemptData,
      answersWithId
    );

    return {
      message: "Quiz attempt submitted successfully",
      attempt,
    };
  };
};

export const getQuizHistoryService = (
  quizKahootModel: QuizKahootModel,
  userModel: UserModel
) => {
  return async (user_uuid: string) => {
    const userId = await userModel.getDetails(user_uuid);
    const quiz = await quizKahootModel.getHistory(userId.id);
    return quiz;
  };
};

export const getIsAllowedQuizService = (models: {
  quizKahootModel: QuizKahootModel;
  formKahootModel: FormKahootModel;
  userModel: UserModel;
}) => {
  return async (user_uuid: string, form_uuid: string) => {
    const { formKahootModel, quizKahootModel, userModel } = models;
    const formDetails = await formKahootModel.getAllDataFormKahoots(form_uuid);
    const userDetails = await userModel.getDetails(user_uuid);
    const quiz = await quizKahootModel.getIsAllowed(
      userDetails.id,
      formDetails.id
    );
    return quiz;
  };
};
