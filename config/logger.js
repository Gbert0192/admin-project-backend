import winston from "winston";

const customFormat = winston.format.printf(
  ({ timestamp, level, message, statusCode }) => {
    const statusPart = statusCode ? ` [HTTP ${statusCode}]` : "";
    return `${timestamp} [${level}]${statusPart}: ${message}`;
  }
);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    customFormat
  ),
  transports: [new winston.transports.Console()],
});

logger.http = (statusCode, message) => {
  logger.log({
    level: getLevelFromStatusCode(statusCode),
    message,
    statusCode,
  });
};

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
