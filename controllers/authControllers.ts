import { Request, Response } from "express";
import {
  loginUserService,
  RegisterUserService,
} from "../services/authServices.js";
import { createTransaction } from "../config/transaction.js";
import { ValidateSchema } from "../utils/validateSchema.js";
import { AuthModel } from "../models/authModel.js";
import {
  loginPayloadSchema,
  registerSchema,
} from "../schemas/authSchema/auth.schema.js";
import pool from "../config/database.js";
import { AppError } from "../middleware/errorMiddleware.js";

export const LoginController = async (req: Request, res: Response) => {
  await createTransaction(pool)(async (db) => {
    const body = ValidateSchema(loginPayloadSchema, req.body);
    const authModel = new AuthModel(db);
    const user = await loginUserService(authModel)(body);
    res.send({ data: user, code: 200, message: "Login Successful" });
  });
};

export const RegisterController = async (req: Request, res: Response) => {
  await createTransaction(pool)(async (db) => {
    try {
      const body = ValidateSchema(registerSchema, req.body);
      const authModel = new AuthModel(db);
      const user = await RegisterUserService(authModel)(body);
      res.send({ data: user, code: 201, message: "Registration Successful" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new AppError(error.message, 500);
      }
      throw new AppError("Unknown error occurred", 500);
    }
  });
};
