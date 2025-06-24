import { AppError } from "../middleware/errorMiddleware.js";
import { FormHuaweiModel } from "../models/formHuaweiModel.js";
import {
  FormHuaweiBodySchema,
  FormHuaweiQuerySchema,
  FormHuaweiQuestionQuerySchema,
  FormHuaweiUpdateBodySchema,
  PublishFormBodySchema,
  QuestionsHuaweiBodySchema,
  QuestionsHuaweiUpdateBodySchema,
} from "../schemas/formHuaweiSchema/formHuawei.schema.js";

export const createFormHuaweiService =
  (formHuaweiModel: FormHuaweiModel) =>
  async (payload: FormHuaweiBodySchema) => {
    const existingForm = await formHuaweiModel.getByTitle(payload.form_title);
    if (existingForm) {
      throw new AppError("Form already exists", 400);
    }

    const form = await formHuaweiModel.create(payload);
    if (!form) {
      throw new AppError("Failed to create Formm", 401);
    }
    return form;
  };

export const createFormHuaweiQuestionService =
  (formHuaweiModel: FormHuaweiModel) =>
  async (payload: QuestionsHuaweiBodySchema, formUuid: string) => {
    const formId = await formHuaweiModel.getDetails(formUuid);
    const form = await formHuaweiModel.createQuestion(payload, formId.id);
    if (!form) {
      throw new AppError("Failed to create Formm", 401);
    }
    return form;
  };

export const updateFormHuaweiQuestionService =
  (formHuaweiModel: FormHuaweiModel) =>
  async (payload: QuestionsHuaweiUpdateBodySchema) => {
    const form = await formHuaweiModel.updateQuestion(payload);
    if (!form) {
      throw new AppError("Failed to Update Formm", 401);
    }
    return form;
  };

export const getFormHuaweiService =
  (formHuaweiModel: FormHuaweiModel) =>
  async (query: FormHuaweiQuerySchema) => {
    const form = await formHuaweiModel.get(query);
    if (!form) {
      throw new AppError("Failed to create Formm", 401);
    }
    return {
      data: form.data,
      total: form.total,
      limit: form.limit,
    };
  };

export const updateFormHuaweiService = (formHuaweiModel: FormHuaweiModel) => {
  return async (payload: FormHuaweiUpdateBodySchema) => {
    const form = await formHuaweiModel.update(payload);
    if (!form) {
      throw new AppError("Failed to create Formm", 401);
    }
    return form;
  };
};

export const deleteFormHuaweiService =
  (formHuaweiModel: FormHuaweiModel) => async (uuid: string) => {
    const form = await formHuaweiModel.delete(uuid);
    if (!form) {
      throw new AppError("Failed to delete Formm", 401);
    }
    return form;
  };

export const publishFormHuaweiService = (formHuaweiModel: FormHuaweiModel) => {
  return async (payload: PublishFormBodySchema) => {
    const form = await formHuaweiModel.publish(payload);
    if (!form) {
      throw new AppError("Failed to create Formm", 401);
    }
    return form;
  };
};

export const getFormHuaweiQuestionService =
  (formHuaweiModel: FormHuaweiModel) =>
  async (query: FormHuaweiQuestionQuerySchema, form_uuid: string) => {
    const form_id = await formHuaweiModel.getDetails(form_uuid);
    const form = await formHuaweiModel.getQuestion(query, form_id.id);
    if (!form) {
      throw new AppError("Failed to get Form", 401);
    }
    return {
      data: form.data,
      total: form.total,
      limit: form.limit,
    };
  };

export const deleteFormHuaweiQuestionService = (
  formHuaweiModel: FormHuaweiModel
) => {
  return async (uuid: string) => {
    const form = await formHuaweiModel.deleteQuestion(uuid);
    if (!form) {
      throw new AppError("Failed to delete Form", 401);
    }
    return form;
  };
};
