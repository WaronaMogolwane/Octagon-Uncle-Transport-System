import { platform } from "node:process";
import WindowsLogger from "../Utilities/WindowsLogger";
import WinstonLogger from "../Utilities/WinstonLogger";

export class CustomLogger {
    Log = (message: string) => {
        WinstonLogger.debug(message);
        if (platform == "win32") {
            WindowsLogger.info(message);
        }
    }
    Error = (message: string) => {
        WinstonLogger.error(message);
        if (platform == "win32") {
            WindowsLogger.error(message);
        }
    }
    Warn = (message: string) => {
        WinstonLogger.warn(message);
        if (platform == "win32") {
            WindowsLogger.warn(message);
        }
    }
}
