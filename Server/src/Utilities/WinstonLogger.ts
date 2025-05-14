import winston, { format } from "winston";
import fs from "fs";
const EventLogTransport = require('winston-winlog4').default;

// Ensure the Logs directory exists
const logDirectory = "./Logs";
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

// Common log format
const logFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    // *** Updated printf format - excludes stack from main message string ***
    format.printf((info) => {
        const { level, message, timestamp } = info;
        // Optionally include metadata (excluding stack) in the formatted message for console/file
        const meta = info[Symbol.for('splat')] ? info[Symbol.for('splat')][0] : null;
        const metaWithoutStack = { ...meta };
        delete metaWithoutStack.stack; // Don't include stack in the formatted message string

        let logMessage = `${timestamp} [${level}]: ${message}`;

        if (Object.keys(metaWithoutStack).length > 0) {
            logMessage += ` ${JSON.stringify(metaWithoutStack)}`; // Append other metadata as JSON string
        }

        // The original 'stack' property is still available in the 'info' object for transports
        // The goal is that winston-winlog4 uses info.message for the main EV message
        // and info[Symbol.for('splat')] for the EV details.

        return logMessage; // Return the formatted string for console/file
    })
);

/**
 * Creates a configured Winston logger instance with specific settings.
 * @param {string} sourceName - The source name for the Windows Event Log transport.
 * @param {string} [logFilePrefix='combined'] - Prefix for log filenames (e.g., 'server', 'worker').
 * @returns {winston.Logger} A configured Winston logger instance.
 */
// Function name starts with a capital letter
export const CreateLogger = (sourceName: string, logFilePrefix: string = 'combined'): winston.Logger => {
    // Variable names start with a lowercase letter
    const logger = winston.createLogger({
        level: process.env.NODE_ENV === "production" ? "info" : "debug", // Overall log level
        format: logFormat,
        transports: [
            new winston.transports.File({
                filename: `${logDirectory}/${logFilePrefix}_error.log`, // Use prefix for error file
                level: "error",
            }),
            new winston.transports.File({
                filename: `${logDirectory}/${logFilePrefix}_combined.log`, // Use prefix for combined file
                level: process.env.NODE_ENV === "production" ? "info" : "debug",
            }),
            new winston.transports.Console({
                format: format.combine(
                    format.colorize({ all: true }),
                    logFormat
                ),
                level: process.env.NODE_ENV === "production" ? "info" : "debug",
            }),
            // Configure the winston-winlog4 transport with the passed sourceName
            new EventLogTransport({
                level: process.env.NODE_ENV === "production" ? "info" : "debug",
                source: sourceName, // Use the passed sourceName
                eventLog: 'Application'
            })
        ],
    });

    return logger;
};

// You would no longer export a default instance here
// export default WinstonLogger;