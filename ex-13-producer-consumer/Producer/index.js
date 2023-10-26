import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/', router);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})