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
} from "../services/formServices.js";

export const GetFormHuaweiController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const formHuaweiModel = new FormHuaweiModel(pool);
    const form = await getFormHuaweiService(formHuaweiModel)(
      res.locals.cleaned
    );
    res.send({
      data: form.data,
      code: 201,
      message: "Get Permission successfully!",
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
      res.locals.cleaned
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
