// index.js
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import winston from 'express-winston'
import router from './routes/routes.js';
import { transports, format, createLogger } from 'winston';
// import errorMiddleWare from './modules/error-mw.js';

const app = express();
const port = process.env.PORT || 3001;
// export const logger = createLogger({
//     transports: [
//         new transports.Console(),
//         new transports.File({
//             level: 'warn',
//             filename: 'log-warnings.log'
//         }),
//         new transports.File({
//             level: 'error',
//             filename: 'log-errors.log'
//         })
//     ],
//     format: format.combine(
//         format.timestamp(),
//         format.json(),
//         format.metadata(),
//         format.prettyPrint()
//     )
// })

// middleware
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());
app.use(express.json());
// app.use(winston.logger({
//     winstonInstance: logger,
//     statusLevels: true
// }));

// custom middleware
// app.use(errorMiddleWare);

// routes
app.use('/api', router);

// const myFormat = format.printf(({level, meta, timestamp}) => {
//     return `${timestamp} ${level}: ${meta.message}`;
// });

// app.use(winston.errorLogger({
//     transports: [
//         new transports.File({
//             filename: 'log-InternalError.log'
//         })
//     ],
//     format: format.combine(
//         myFormat,
//         format.prettyPrint()
//     )
// }));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});