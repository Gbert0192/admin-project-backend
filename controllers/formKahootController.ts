import { NextFunction, Request, Response } from "express";
import pool from "../config/database.js";
import { createTransaction } from "../config/transaction.js";
import { FormKahootModel } from "../models/formKahootModel.js";
import { createFormKahootService, deleteFormKahootService, updateFormKahootService } from "../services/formKahootServices.js";
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

export const UpdateFormKahootController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const formKahootModel = new FormKahootModel(pool);
        const form = await updateFormKahootService(formKahootModel)(req.body);
        res.send({
            data: form,
            code: 201,
            message: "Update Form successfully!",
        });
    } catch (error) {
        next(error);
        
    }
};

export const DeleteFormKahootController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const formKahootModel = new FormKahootModel(pool);
        const form = await deleteFormKahootService(formKahootModel)(res.locals.cleaned.uuid);
        res.send({
            data: form,
            code: 201,
            message: "Delete Form successfully!",
        });
    } catch (error) {
        next(error);
    }
};