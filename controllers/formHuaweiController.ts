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
      message: "Permission Deleted successfully!",
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
    const form = await getFormHuaweiQuestionService(formHuaweiModel)(
      res.locals.cleaned,
      form_uuid
    );
    res.send({
      data: form.data,
      code: 201,
      message: "Permission created successfully!",
    });
  } catch (error) {
    next(error);
  }
};
