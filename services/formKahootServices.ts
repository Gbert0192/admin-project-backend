import { AppError } from "../middleware/errorMiddleware.js";
import { FormKahootModel } from "../models/formKahootModel.js";
import {
  FormKahootBodySchema,
  FormKahootQuerySchema,
  FormKahootUpdateBodySchema,
} from "../schemas/formKahootSchema/formKahoot.schema.js";

export const createFormKahootService =
  (formKahootModel: FormKahootModel) =>
  async (payload: FormKahootBodySchema) => {
    const existingForm = await formKahootModel.getFormKahootByTitle(
      payload.form_title
    );
    if (existingForm) {
      throw new AppError("Form already exists", 401);
    }

    const form = await formKahootModel.createFormKahoot(payload);

    if (!form) {
      throw new AppError("Failed to create Form", 401);
    }
    return form;
  };

export const getFormKahootService =
  (formKahootModel: FormKahootModel) =>
  async (query: FormKahootQuerySchema) => {
    const form = await formKahootModel.getAllFormKahoots(query);
    if (!form) {
      throw new AppError("Failed to retrieve Forms", 401);
    }
    return {
      data: form.data,
      total: form.total,
      limit: form.limit,
    };
  };

export const updateFormKahootService =
  (formKahootModel: FormKahootModel) =>
  async (payload: FormKahootUpdateBodySchema) => {
    const form = await formKahootModel.updateFormKahoot(payload);
    if (!form) {
      throw new AppError("Failed to update Form", 401);
    }
    return form;
  };

export const deleteFormKahootService =
  (formKahootModel: FormKahootModel) =>
  async (uuid: string) => {
    const form = await formKahootModel.deleteFormKahoot(uuid);
    if (!form) {
      throw new AppError("Failed to delete Form", 401);
    }
    return form;
  };
