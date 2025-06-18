import { NextFunction } from "express";
import { createTransaction } from "../config/transaction.js";
import pool from "../config/database.js";
import { Request, Response } from "express";

export const CreateFormController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTransaction(pool)(async (db) => {
      res.send({
        data: null,
        code: 201,
        message: "Permission created successfully!",
      });
    });
  } catch (error) {
    next(error);
  }
};
