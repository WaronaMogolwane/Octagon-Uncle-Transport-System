// In your WinstonLogger.ts file

import winston, { format } from "winston";
import fs from "fs";
// Remove this import as we are removing the transport:
// const EventLogTransport = require('winston-winlog4').default;

// Ensure the Logs directory exists
const logDirectory = "./Logs"; // Adjust path as needed
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

// Common log format
const logFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf((info) => {
        const { level, message, timestamp } = info;
        const meta = info[Symbol.for('splat')] ? info[Symbol.for('splat')][0] : null;
        const metaWithoutStack = { ...meta };
        delete metaWithoutStack.stack;

        let logMessage = `${timestamp} [${level}]: ${message}`;

        if (Object.keys(metaWithoutStack).length > 0) {
            logMessage += ` ${JSON.stringify(metaWithoutStack)}`;
        }

        return logMessage;
    })
);

/**
 * Creates a configured Winston logger instance with specific settings (File and Console transports).
 * *** This version EXCLUDES the winston-winlog4 transport. ***
 * @param {string} [logFilePrefix='combined'] - Prefix for log filenames (e.g., 'server', 'worker').
 * @returns {winston.Logger} A configured Winston logger instance.
 */
export const CreateLogger = (logFilePrefix: string = 'combined'): winston.Logger => {
    const logger = winston.createLogger({
        level: process.env.NODE_ENV === "production" ? "info" : "debug",
        format: logFormat,
        transports: [
            new winston.transports.File({
                filename: `${logDirectory}/${logFilePrefix}_error.log`,
                level: "error",
            }),
            new winston.transports.File({
                filename: `${logDirectory}/${logFilePrefix}_combined.log`,
                level: process.env.NODE_ENV === "production" ? "info" : "debug",
            }),
            new winston.transports.Console({
                format: format.combine(
                    format.colorize({ all: true }),
                    logFormat
                ),
                level: process.env.NODE_ENV === "production" ? "info" : "debug",
            }),
            // *** REMOVE the winston-winlog4 transport from here ***
            // new EventLogTransport({ level: process.env.NODE_ENV === "production" ? "info" : "debug", source: sourceName, eventLog: 'Application' })
        ],
    });

    return logger;
};

// Remove the default export if you no longer need it
// export default WinstonLogger;