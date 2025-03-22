import { platform } from "node:process";
import WindowsLogger from "../Utilities/WindowsLogger";
import WinstonLogger from "../Utilities/WinstonLogger";

export class CustomLogger {
    /**
     * Logs a message with a specified level.
     * @param {string} level - The log level (e.g., 'info', 'error', 'warn').
     * @param {string} message - The message to log.
     */
    private logMessage(level: string, message: string): void {
        // Log with Winston
        WinstonLogger[level](message);

        // Log with WindowsLogger if platform is win32
        if (platform === "win32" && WindowsLogger) {
            if (WindowsLogger[level]) {
                WindowsLogger[level](message);
            } else {
                console.warn(`Unsupported log level '${level}' for WindowsLogger.`);
            }
        }
    }

    /**
     * Logs an informational message.
     * @param {string} message - The message to log.
     */
    Log(message: string): void {
        this.logMessage("info", message);
    }

    /**
     * Logs an error message.
     * @param {string} message - The error message to log.
     */
    Error(message: string): void {
        this.logMessage("error", message);
    }

    /**
     * Logs a warning message.
     * @param {string} message - The warning message to log.
     */
    Warn(message: string): void {
        this.logMessage("warn", message);
    }
}
