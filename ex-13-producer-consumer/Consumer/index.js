import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes/routes.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})