import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import winston from 'express-winston';
import { transports, format, createLogger } from 'winston';
import errorMiddleware from './modules/error-mw.js';
import getRouter from './routes/get_routes.js';
import postRouter from './routes/post_routes.js';
import putRouter from './routes/put_routes.js';
import deleteRouter from './routes/delete_routes.js';

const app = express();
const port = process.env.PORT || 3000;
export let insecureUserDatabase = [];
export const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            level: 'warn',
            filename: 'log-warnings.log'
        }),
        new transports.File({
            level: 'error',
            filename: 'log-errors.log'
        })
    ],
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.metadata(),
        format.prettyPrint()
    )
})

// middlware
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(winston.logger({
    winstonInstance: logger,
    statusLevels: true
}));
app.use(errorMiddleware);

// routes
app.use('/api', getRouter);
app.use('/api', postRouter);
app.use('/api', putRouter);
app.use('/api', deleteRouter);

const myFormat = format.printf(({level, meta, timestamp}) => {
    return `${timestamp} ${level}: ${meta.message}`;
});

app.use(winston.errorLogger({
    transports: [
        new transports.File({
            filename: 'log-InternalError.log'
        })
    ],
    format: format.combine(
        myFormat,
        format.prettyPrint()
    )
}));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})