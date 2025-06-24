import rateLimit from "express-rate-limit";
import { AppError } from "./errorMiddleware.js";

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.ip || "";
  },
  handler: (req, res, next) => {
    const error = new AppError(
      "Too Many requests, please try again later.",
      429
    );
    next(error);
  },
});
