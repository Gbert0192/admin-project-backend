import express from "express";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

import authRoutes from "./routes/authRoutes.js";
import logger from "./config/logger.js";
import userRouter from "./routes/userRoutes.js";
import { RoleRouter } from "./routes/roleRoutes.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/user", userRouter);
app.use("/role", RoleRouter);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
