import { NextFunction } from "express";
import { createTransaction } from "../config/transaction.js";
import pool from "../config/database.js";
import { Request, Response } from "express";
import { FormHuaweiModel } from "../models/formHuaweiModel.js";
import {
  getFormHuaweiService,
  createFormHuaweiService,
  updateFormHuaweiService,
  deleteFormHuaweiService,
  createFormHuaweiQuestionService,
  publishFormHuaweiService,
  getFormHuaweiQuestionService,
  updateFormHuaweiQuestionService,
  deleteFormHuaweiQuestionService,
} from "../services/formHuaweiServices.js";
import { pickKey } from "../utils/queryHelper.js";

export const GetFormHuaweiController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const formHuaweiModel = new FormHuaweiModel(pool);
    const {
      data: form,
      total,
      limit,
    } = await getFormHuaweiService(formHuaweiModel)(res.locals.cleaned);
    const filteredFormHuawei = form.map((item) =>
      pickKey(item, [
        "uuid",
        "form_title",
        "form_description",
        "is_published",
        "created_at",
        "published_single_choice_count",
        "published_multiple_choice_count",
        "published_true_false_count",
        "published_essay_count",
      ])
    );
    const totalPages = Math.ceil(total / limit);

    res.send({
      data: filteredFormHuawei,
      code: 201,
      message: "Get Form successfully!",
      total: total,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};

export const CreateFormHuaweiController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTransaction(pool)(async (trx) => {
      const formHuaweiModel = new FormHuaweiModel(trx);
      const form = await createFormHuaweiService(formHuaweiModel)(req.body);
      res.send({
        data: form,
        code: 201,
        message: "Permission created successfully!",
      });
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateFormHuaweiController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const formHuaweiModel = new FormHuaweiModel(pool);
    const form = await updateFormHuaweiService(formHuaweiModel)(req.body);
    res.send({
      data: form,
      code: 201,
      message: "Permission Updated successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteFormHuaweiController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const formHuaweiModel = new FormHuaweiModel(pool);
    const form = await deleteFormHuaweiService(formHuaweiModel)(
      res.locals.cleaned.uuid
    );
    res.send({
      data: form,
      code: 201,
      message: "Form Deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const CreateFormHuaweiQuestionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTransaction(pool)(async (trx) => {
      const formHuaweiModel = new FormHuaweiModel(trx);
      const formUuid = req.params.formUuid;
      const form = await createFormHuaweiQuestionService(formHuaweiModel)(
        req.body,
        formUuid
      );
      res.send({
        data: form,
        code: 201,
        message: "Permission created successfully!",
      });
    });
  } catch (error) {
    next(error);
  }
};

export const PublishFormHuaweiController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTransaction(pool)(async (trx) => {
      const formHuaweiModel = new FormHuaweiModel(trx);
      const form = await publishFormHuaweiService(formHuaweiModel)(req.body);
      const filteredFormHuawei = pickKey(form, [
        "uuid",
        "form_title",
        "form_description",
        "is_published",
        "created_at",
      ]);
      res.send({
        data: filteredFormHuawei,
        code: 201,
        message: "Permission created successfully!",
      });
    });
  } catch (error) {
    next(error);
  }
};

export const GetFormHuaweiQuestionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const formHuaweiModel = new FormHuaweiModel(pool);
    const form_uuid = req.params.formUuid;
    const {
      data: form,
      total,
      limit,
    } = await getFormHuaweiQuestionService(formHuaweiModel)(
      res.locals.cleaned,
      form_uuid
    );
    const filteredFormHuawei = form.map((item) =>
      pickKey(item, [
        "uuid",
        "question",
        "type",
        "created_at",
        "options",
        "difficulty",
        "point",
      ])
    );

    const totalPages = Math.ceil(total / limit);

    res.send({
      data: filteredFormHuawei,
      code: 201,
      message: "Permission created successfully!",
      total: total,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateFormHuaweiQuestionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTransaction(pool)(async (trx) => {
      const formHuaweiModel = new FormHuaweiModel(trx);
      const form = await updateFormHuaweiQuestionService(formHuaweiModel)(
        req.body
      );
      res.send({
        data: form,
        code: 201,
        message: "Permission created successfully!",
      });
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteFormHuaweiQuestionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTransaction(pool)(async (trx) => {
      const formHuaweiModel = new FormHuaweiModel(trx);
      const uuid = req.params.questionUuid;
      const form = await deleteFormHuaweiQuestionService(formHuaweiModel)(uuid);
      res.send({
        data: form,
        code: 201,
        message: "Form Deleted successfully!",
      });
    });
  } catch (error) {
    next(error);
  }
};
