import { PostgresStore } from "@acpr/rate-limit-postgresql";
import rateLimit from "express-rate-limit";
import pool from "../config/database.js";

export const apiLimiter = rateLimit({
  windowMs: 10000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  store: new PostgresStore(
    {
      client: pool,
      tableName: "rate_limit_sessions",
      schemaName: "public",
    },
    "api_limiter"
  ),
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
});
