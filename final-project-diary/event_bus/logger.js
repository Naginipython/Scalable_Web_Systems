import { transports, format, createLogger } from 'winston';

const myFormat = format.printf(({level, message, pid, timestamp}) => {
    return `(${pid}) [${timestamp}] ${level} message: ${message}`;
})

const errLogger = createLogger({
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

export default errLogger;