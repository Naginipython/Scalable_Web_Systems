import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import winston from 'express-winston';
import { transports, format, createLogger } from 'winston';
import { errLogger, logger } from './logger/logger.js';
import getRouter from './routes/get_routes.js';
import postRouter from './routes/post_routes.js';
import putRouter from './routes/put_routes.js';
import deleteRouter from './routes/delete_routes.js';

const app = express();
const port = process.env.PORT || 3000;
export let insecureUserDatabase = [];

// middlware
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// routes
app.use('/api', getRouter);
app.use('/api', postRouter);
app.use('/api', putRouter);
app.use('/api', deleteRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})