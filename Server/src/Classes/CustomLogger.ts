// In your CustomLogger.ts file

import { platform } from "node:process";
import winston from "winston";

// Define a type alias for the EventLogger from node-windows
// This helps with TypeScript type checking
type NodeWindowsEventLogger = {
    error: (message: string, eventId?: number) => void;
    warn: (message: string, eventId?: number) => void;
    info: (message: string, eventId?: number) => void;
    // Add other methods if you use them (e.g., verbose, debug, silly)
    // based on how node-windows EventLogger works or how you map Winston levels
};

export class CustomLogger {
    // Hold the Winston logger instance
    private loggerInstance: winston.Logger;
    // Add an optional property to hold the node-windows EventLogger instance
    private eventLoggerInstance: NodeWindowsEventLogger | undefined;

    /**
     * Creates a custom logger that wraps a Winston logger and optionally logs to a node-windows EventLogger.
     * @param {winston.Logger} winstonLogger - The specific Winston logger instance to use (configured for transports like file/console).
     * @param {object} [options] - Optional configuration object.
     * @param {NodeWindowsEventLogger} [options.eventLogger] - Optional node-windows EventLogger instance to use on Windows.
     */
    constructor(winstonLogger: winston.Logger, options?: { eventLogger?: NodeWindowsEventLogger }) {
        this.loggerInstance = winstonLogger;
        // Assign the provided EventLogger instance if available
        this.eventLoggerInstance = options?.eventLogger;
    }

    /**
     * Internal method to handle logging based on level and available loggers.
     * @private
     * @param {string} level - The log level (e.g., 'info', 'error').
     * @param {string} message - The primary log message.
     * @param {...any[]} meta - Additional metadata for the log entry.
     */
    private LogMessage(level: string, message: string, ...meta: any[]): void {
        // 1. Log using the wrapped Winston instance (for file/console transports configured in WinstonLogger.ts)
        // We check if the level exists on the Winston logger instance
        if (this.loggerInstance[level]) {
            this.loggerInstance[level](message, ...meta);
        } else {
            // Handle unsupported Winston levels by logging a warning and using info level
            console.warn(`Unsupported Winston log level '${level}' for wrapped logger.`);
            this.loggerInstance.info(`Unsupported log level '${level}': ${message}`, ...meta);
        }

        // 2. If the platform is Windows AND an EventLogger instance was provided to this CustomLogger instance,
        // also log to the Windows Event Viewer using the node-windows instance.
        if (platform === 'win32' && this.eventLoggerInstance) {
            // Format the message and metadata for the EventLogger (which typically expects a single string message)
            const eventLogMessage = message + (meta.length > 0 ? ' ' + JSON.stringify(meta) : '');
            const eventId = 1000; // Default Event ID - You can make this configurable if needed

            // Map Winston/standard log levels to node-windows EventLogger methods
            switch (level) {
                case 'error':
                    this.eventLoggerInstance.error(eventLogMessage, eventId);
                    break;
                case 'warn':
                    this.eventLoggerInstance.warn(eventLogMessage, eventId);
                    break;
                // Map common info-level or lower levels to the EventLogger's info method
                case 'info':
                case 'http': // Winston's http level
                case 'verbose': // Winston's verbose level
                case 'debug': // Winston's debug level
                case 'silly': // Winston's silly level
                    this.eventLoggerInstance.info(eventLogMessage, eventId);
                    break;
                default:
                    // For any other levels, log them as info in the Event Viewer, including the original level
                    this.eventLoggerInstance.info(`[${level.toUpperCase()}] ${eventLogMessage}`, eventId);
                    break;
            }
        }
    }

    // Public logging methods exposed by the CustomLogger

    /**
     * Logs an informational message.
     * @param {string} message - The primary log message.
     * @param {...any[]} meta - Additional metadata.
     */
    Log(message: string, ...meta: any[]): void {
        this.LogMessage("info", message, ...meta);
    }

    /**
     * Logs an error message.
     * @param {string} message - The primary log message.
     * @param {...any[]} meta - Additional metadata.
     */
    Error(message: string, ...meta: any[]): void {
        this.LogMessage("error", message, ...meta);
    }

    /**
     * Logs a warning message.
     * @param {string} message - The primary log message.
     * @param {...any[]} meta - Additional metadata.
     */
    Warn(message: string, ...meta: any[]): void {
        this.LogMessage("warn", message, ...meta);
    }

    /**
     * Logs a debug message.
     * @param {string} message - The primary log message.
     * @param {...any[]} meta - Additional metadata.
     */
    Debug(message: string, ...meta: any[]): void {
        this.LogMessage("debug", message, ...meta);
    }

    /**
     * Logs a verbose message.
     * @param {string} message - The primary log message.
     * @param {...any[]} meta - Additional metadata.
     */
    Verbose(message: string, ...meta: any[]): void {
        this.LogMessage("verbose", message, ...meta);
    }

    /**
     * Logs an HTTP related message.
     * @param {string} message - The primary log message.
     * @param {...any[]} meta - Additional metadata.
     */
    HTTP(message: string, ...meta: any[]): void {
        this.LogMessage("http", message, ...meta);
    }

    /**
     * Logs a silly message.
     * @param {string} message - The primary log message.
     * @param {...any[]} meta - Additional metadata.
     */
    Silly(message: string, ...meta: any[]): void {
        this.LogMessage("silly", message, ...meta);
    }
}