import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import logger from "./config/logger.js";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";
import { AuthRouter } from "./routes/authRoutes.js";
import { PermissionRouter } from "./routes/permissionRoutes.js";
import UserRouter from "./routes/userRoutes.js";
dotenv.config();
const app = express();
const port = parseInt(process.env.PORT || "8000", 10);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/permissions", PermissionRouter);
app.use(errorHandler);
app.use(notFoundHandler);
app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});
//# sourceMappingURL=server.js.map