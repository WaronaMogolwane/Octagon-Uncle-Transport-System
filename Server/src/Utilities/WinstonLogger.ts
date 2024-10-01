import winston, { format } from 'winston';
import ErrorHandler from '../Middleware/ErrorHandler';

const WinstonLogger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level}]: ${message}`;
        })),
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({
            filename: './Logs/error.log',
            level: 'error',
            format: winston.format.printf(({ level, message, timestamp }) => {
                return `${timestamp} [${level}]: ${message}`;
            })
        }),
        new winston.transports.File({
            filename: './Logs/combined.log',
            format: winston.format.printf(({ level, message, timestamp }) => {
                return `${timestamp} [${level}]: ${message}`;
            })
        }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    WinstonLogger.add(new winston.transports.Console({
        format: winston.format.colorize({ all: true, level: true }),
    }));
}
export default WinstonLogger;