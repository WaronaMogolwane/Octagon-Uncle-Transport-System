import { platform } from "node:process";
import winston from "winston";

export class CustomLogger {
    // Hold a specific logger instance for this CustomLogger instance (lowercase variable name)
    private loggerInstance: winston.Logger;

    /**
     * @param {winston.Logger} logger - The specific Winston logger instance to use (lowercase parameter name).
     */
    constructor(logger: winston.Logger) {
        this.loggerInstance = logger;
    }

    // Method name starts with a capital letter
    // Updated to accept additional arguments/metadata
    private LogMessage(level: string, message: string, ...meta: any[]): void {
        // Log using the instance passed to this CustomLogger
        if (this.loggerInstance[level]) {
            // Pass the message and all additional arguments to the Winston logger method
            this.loggerInstance[level](message, ...meta);
        } else {
            // If level is unsupported, log a warning using info level
            // Still pass the original message and metadata with the warning
            console.warn(`Unsupported log level '${level}' for logger.`);
            this.loggerInstance.info(`Unsupported log level '${level}': ${message}`, ...meta);
        }
    }

    // Updated to accept additional arguments/metadata
    Log(message: string, ...meta: any[]): void {
        this.LogMessage("info", message, ...meta);
    }

    // Updated to accept additional arguments/metadata
    Error(message: string, ...meta: any[]): void { // Accepts message string and any number of additional args
        this.LogMessage("error", message, ...meta);
    }

    // Updated to accept additional arguments/metadata
    Warn(message: string, ...meta: any[]): void {
        this.LogMessage("warn", message, ...meta);
    }
}