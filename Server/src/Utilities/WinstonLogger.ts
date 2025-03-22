import winston, { format } from "winston";
import fs from "fs";

// Ensure the Logs directory exists
const logDirectory = "./Logs";
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

// Common log format
const logFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} [${level}]: ${stack || message}`;
    })
);

// Winston Logger instance
const WinstonLogger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "error" : "debug", // Adjust log level dynamically
    format: logFormat,
    transports: [
        new winston.transports.File({
            filename: `${logDirectory}/error.log`,
            level: "error",
        }),
        new winston.transports.File({
            filename: `${logDirectory}/combined.log`,
        }),
    ],
});

// Add console logging for non-production environments
if (process.env.NODE_ENV !== "production") {
    WinstonLogger.add(
        new winston.transports.Console({
            format: format.combine(
                format.colorize({ all: true }),
                logFormat
            ),
        })
    );
}

export default WinstonLogger;
