import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import logger from "./config/logger.js";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";
import { AuthRouter } from "./routes/authRoutes.js";
import { PermissionRouter } from "./routes/permissionRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { RoleRouter } from "./routes/roleRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT || "8000", 10);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);

app.use(apiLimiter);

app.use("/auth", AuthRouter);

app.use(authMiddleware);

app.use("/user", UserRouter);
app.use("/permissions", PermissionRouter);
app.use("/roles", RoleRouter);

app.use(errorHandler);

app.use(notFoundHandler);
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

// process.on("uncaughtException", (err) => {
//   logger.error("Uncaught Exception thrown:", err.message);
//   process.exit(1);
// });
