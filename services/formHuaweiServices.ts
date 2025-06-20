import { AppError } from "../middleware/errorMiddleware.js";
import { FormHuaweiModel } from "../models/formHuaweiModel.js";
import {
  FormHuaweiBodySchema,
  FormHuaweiQuerySchema,
  FormHuaweiUpdateBodySchema,
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
