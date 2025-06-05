import winston from "winston";
const customFormat = winston.format.printf((info) => {
    const statusPart = info.statusCode ? ` [HTTP ${info.statusCode}]` : "";
    return `${info.timestamp} [${info.level}]${statusPart}: ${info.message}`;
});
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), customFormat),
    transports: [new winston.transports.Console()],
});
const httpLogger = (statusCode, message) => {
    const level = getLevelFromStatusCode(statusCode);
    logger.log({
        level,
        message,
        statusCode,
    });
};
Object.defineProperty(logger, "http", {
    value: httpLogger,
    writable: true,
    configurable: true,
});
function getLevelFromStatusCode(statusCode) {
    if (statusCode >= 500) {
        return "error";
    }
    if (statusCode >= 400) {
        return "warn";
    }
    return "info";
}
export default logger;
//# sourceMappingURL=logger.js.map