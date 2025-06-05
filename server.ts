import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import logger from "./config/logger.js";
import { notFoundHandler } from "./middleware/errorMiddleware.js";
import { AuthRouter } from "./routes/authRoutes.js";
import UserRouter from "./routes/userRoutes.js";

dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT || "8000", 10);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", AuthRouter);
app.use("/user", UserRouter);

app.use(notFoundHandler);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
