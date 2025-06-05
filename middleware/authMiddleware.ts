import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/tokenHelper.js";

interface DecodedToken {
  student_id: string;
  name: string;
  role_id: number;
  iat?: number;
  exp?: number;
}

declare global {
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
): Promise<void> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Unauthorized");
    }
    const decoded = (await verifyToken(token)) as DecodedToken;
    if (!decoded) {
      throw new Error("Token Not Valid");
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
}
