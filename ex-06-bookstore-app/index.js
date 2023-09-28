// index.js
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import router from './routes/routes.js';
import errorMiddleWare from './modules/error-mw.js';

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// custom middleware
app.use(errorMiddleWare);

// routes
app.use('/api', router);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});