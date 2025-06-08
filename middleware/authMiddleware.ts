import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/tokenHelper.js";
import { AppError } from "./errorMiddleware.js";

interface DecodedToken {
  student_id: string;
  name: string;
  role_id: number;
  iat?: number;
  exp?: number;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(
        "Authentication invalid: No token provided or malformed header",
        401
      );
    }
    const token = authHeader.split(" ")[1];
    const decoded = (await verifyToken(token)) as DecodedToken;
    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
}
