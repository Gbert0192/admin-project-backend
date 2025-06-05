import { Request, Response } from "express";
import { loginUserService } from "../services/authServices.js";
import { createTransaction } from "../config/transaction.js";
import { ValidateSchema } from "../utils/validateSchema.js";
import { AuthModel } from "../models/authModel.js";
import { loginPayloadSchema } from "../schemas/authSchema/auth.schema.js";
import pool from "../config/database.js";

export const LoginController = async (req: Request, res: Response) => {
  await createTransaction(pool)(async (db) => {
    const body = ValidateSchema(loginPayloadSchema, req.body);
    const authModel = new AuthModel(db);
    const user = await loginUserService(authModel)(body);
    res.send({ data: user, code: 200, message: "Login Successful" });
  });
};

// export const RegisterController = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   await withTransaction(async (db: Pool) => {
//     const body = ValidateSchema(registerSchema, req.body);
//     const registerModel = handleRegisterModel(body, db);
//     const user = await registerUserService(registerModel)(body);
//     res.send(user);
//   });
// };
