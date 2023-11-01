import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import router from './routes/routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
    console.log(`[${process.ppid}] Server is running on port ${port}`)
});