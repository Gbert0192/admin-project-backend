import { NextFunction, Request, Response } from "express";
import pool from "../config/database.js";
import { createTransaction } from "../config/transaction.js";
import { FormKahootModel } from "../models/formKahootModel.js";
import {
  createFormKahootService,
  deleteFormKahootService,
  getFormKahootQuestionService,
  updateFormKahootService,
  createFormKahootQuestionService,
  updateFormKahootQuestionService,
} from "../services/formKahootServices.js";
import { pickKey } from "../utils/queryHelper.js";

export const CreateFormKahootController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTransaction(pool)(async (trx) => {
      const formKahootModel = new FormKahootModel(trx);
      const form = await createFormKahootService(formKahootModel)(req.body);
      res.send({
        data: form,
        code: 201,
        message: "Create Form successfully!",
      });
    });
  } catch (error) {
    next(error);
  }
};

export const GetFormKahootController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const formKahootModel = new FormKahootModel(pool);
    const {
      data: form,
      total,
      limit,
    } = await formKahootModel.getAllFormKahoots(res.locals.cleaned);
    const filteredFormKahoot = form.map((item) =>
      pickKey(item, [
        "uuid",
        "form_title",
        "form_description",
        "is_published",
        "duration",
        "created_at",
      ])
    );
    const totalPages = Math.ceil(total / limit);

    res.send({
      data: filteredFormKahoot,
      code: 201,
      message: "Get Form successfully!",
      total: total,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateFormKahootController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTransaction(pool)(async (trx) => {
      const formKahootModel = new FormKahootModel(trx);
      const form = await updateFormKahootService(formKahootModel)(req.body);
      res.send({
        data: form,
        code: 201,
        message: "Update Form successfully!",
      });
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteFormKahootController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTransaction(pool)(async (trx) => {
      const formKahootModel = new FormKahootModel(trx);
      const form = await deleteFormKahootService(formKahootModel)(
        res.locals.cleaned.uuid
      );
      res.send({
        data: form,
        code: 201,
        message: "Delete Form successfully!",
      });
    });
  } catch (error) {
    next(error);
  }
};

// Question
export const CreateFormKahootQuestionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTransaction(pool)(async (trx) => {
      const formKahootModel = new FormKahootModel(trx);
      const form = await createFormKahootQuestionService(formKahootModel)(
        req.body,
        res.locals.cleaned.uuid
      );
      res.send({
        data: form,
        code: 201,
        message: "Create Question successfully!",
      });
    });
  } catch (error) {
    next(error);
  }
};

export const GetFormKahootQuestionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const formKahootModel = new FormKahootModel(pool);
    const form_uuid = req.params.formUuid;
    const form = await getFormKahootQuestionService(formKahootModel)(
      res.locals.cleaned,
      form_uuid
    );
    const filteredFormKahoot = form.data.map((item) =>
      pickKey(item, [
        "uuid",
        "question_text",
        "question_type",
        "created_at",
        "options",
      ])
    );
    res.send({
      data: filteredFormKahoot,
      code: 201,
      message: "Permission created successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateFormKahootQuestionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTransaction(pool)(async (trx) => {
      const formKahootModel = new FormKahootModel(trx);
      const form = await updateFormKahootQuestionService(formKahootModel)(
        req.body
      );
      res.send({
        data: form,
        code: 201,
        message: "Update Question successfully!",
      });
    });
  } catch (error) {
    next(error);
  }
};
