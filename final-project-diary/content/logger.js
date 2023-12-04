import { transports, format, createLogger } from 'winston';

const myFormat = format.printf(({level, message, pid, timestamp}) => {
    return `(${pid}) [${timestamp}] ${level} message: ${message}`;
})

export const logger = createLogger({
    level: 'info',
    transports: [
        new transports.Console(),
        new transports.File({
            level: 'info',
            filename: 'log-info.log'
        })
    ],
    format: format.combine(
        format.timestamp(),
        myFormat
    )
});

export const errLogger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            level: 'error',
            filename: 'log-Error.log'
        })
    ],
    format: format.combine(
        format.timestamp(),
        myFormat
    )
})

