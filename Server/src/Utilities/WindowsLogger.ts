import { EventLogger } from 'node-windows';
import { platform } from 'node:process';
var WindowsLogger: EventLogger
if (platform == "win32") {
    var WindowsEventLogger = require('node-windows').EventLogger;
    WindowsLogger = new WindowsEventLogger();
    WindowsLogger.source = 'Octagon Uncle Transport'
}
export default WindowsLogger;