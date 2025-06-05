import logger from "../config/logger.js";
export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
export const errorHandler = (err, req, res) => {
    let error = { ...err };
    error.message = err.message;
    logger.error(`${err.name}: ${err.message}`);
    logger.error(err.stack);
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
            ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
        });
    }
    if (err.name === "ValidationError") {
        const message = Object.values(err.name)
            .map((val) => val.message)
            .join(", ");
        error = new AppError(message, 400);
    }
    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new AppError(message, 400);
    }
    if (err.name === "CastError") {
        const message = "Invalid ID format";
        error = new AppError(message, 400);
    }
    if (err.name === "JsonWebTokenError") {
        const message = "Invalid token. Please log in again";
        error = new AppError(message, 401);
    }
    if (err.name === "TokenExpiredError") {
        const message = "Your token has expired. Please log in again";
        error = new AppError(message, 401);
    }
    res.status(error.statusCode || 500).json({
        message: error.message || "Something went wrong",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};
export const notFoundHandler = (req, res) => {
    const error = new AppError(`Not Found - ${req.originalUrl}`, 404);
    res.status(404).json({
        status: "fail",
        message: error.message,
    });
};
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
//# sourceMappingURL=errorMiddleware.js.map