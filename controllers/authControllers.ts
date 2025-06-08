import { NextFunction, Request, Response } from "express";
import pool from "../config/database.js";
import { createTransaction } from "../config/transaction.js";
import { AuthModel } from "../models/authModel.js";
import {
  loginPayloadSchema,
  registerSchema,
} from "../schemas/authSchema/auth.schema.js";
import {
  loginUserService,
  RegisterUserService,
} from "../services/authServices.js";
import { ValidateSchema } from "../utils/validateSchema.js";

export const LoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTransaction(pool)(async (db) => {
      const body = ValidateSchema(loginPayloadSchema, req.body);
      const authModel = new AuthModel(db);
      const user = await loginUserService(authModel)(body);
      res
        .status(200)
        .json({ data: user, code: 200, message: "Login Successful" });
    });
  } catch (error) {
    next(error);
  }
};

export const RegisterController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createTransaction(pool)(async (db) => {
      const body = ValidateSchema(registerSchema, req.body);
      const authModel = new AuthModel(db);
      const user = await RegisterUserService(authModel)(body);
      res.send({ data: user, code: 201, message: "Registration Successful" });
    });
  } catch (error) {
    next(error);
  }
};
