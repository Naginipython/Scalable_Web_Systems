// Entry Point
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import router from './routes/routes.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());

//routes;
app.use('/test', router);

app.listen(port, () => {
    console.log(`Server is listening on Port ${port}`);
});