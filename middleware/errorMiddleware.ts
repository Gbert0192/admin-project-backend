import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import logger from "../config/logger.js";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}
export const errorHandler: ErrorRequestHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  logger.error(`[${req.method}] ${req.path} - ${err.name}: ${err.message}`);
  logger.error(err.stack);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
    return;
  }

  const message =
    process.env.NODE_ENV === "development"
      ? err.message
      : "Terjadi kesalahan pada server.";

  res.status(500).json({
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  const error = new AppError(`Not Found - ${req.originalUrl}`, 404);
  res.status(404).json({
    status: "fail",
    message: error.message,
  });
};

export function handleErrorResponse(res: Response, error: Error) {
  let status = 500;
  let message = "Internal Server Error";

  if (error instanceof Error) {
    if (error.message === "User not found") {
      status = 404;
    } else if (error.message === "Invalid credentials") {
      status = 401;
    }
    message = error.message;
  }

  res.status(status).json({ data: null, code: status, message });
}
