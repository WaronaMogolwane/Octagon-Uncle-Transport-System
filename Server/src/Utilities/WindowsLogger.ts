import { platform } from "node:process";
import { EventLogger } from "node-windows";

let WindowsLogger: EventLogger | undefined;

if (platform === "win32") {
    const { EventLogger } = require("node-windows");
    WindowsLogger = new EventLogger();
    WindowsLogger.source = "Octagon Uncle Transport";
} else {
    console.warn("WindowsLogger is not supported on this platform.");
}

export default WindowsLogger;