import winston from 'winston';

const WinstonLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: './Logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: './Logs/combined.log' }),
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