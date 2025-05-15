// In your WindowsLogger.ts file

import { platform } from "node:process";
import { ServerLogger } from "../server";
const { EventLogger } = require('node-windows');

let ServerLoggerInstance: typeof EventLogger | undefined;
let WorkerLoggerInstance: typeof EventLogger | undefined;
if (platform === "win32") {
    CreateWindowsLoggers();
} else {
    console.warn("node-windows EventLogger is not supported on this platform.");
}

function CreateWindowsLoggers() {
    try {
        // Create instances with specific source names for Server and Worker
        ServerLoggerInstance = new EventLogger('Octagon Uncle Server');
        WorkerLoggerInstance = new EventLogger('Octagon Uncle Worker');
    } catch (e) {
        ServerLogger.Error("Failed to create node-windows EventLoggers:", e);
        ServerLoggerInstance = undefined;
        WorkerLoggerInstance = undefined;
    }
}

// *** Modify this file to export both Server and Worker loggers ***
// Using named exports is recommended for clarity
export const ServerEventLogger = ServerLoggerInstance;
export const WorkerEventLogger = WorkerLoggerInstance;

// Remove the default export if you no longer need it
// export default ServerLoggerInstance; // <--- Remove or adjust this line