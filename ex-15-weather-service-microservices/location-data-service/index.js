import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import router from './routes/routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`[${process.ppid}] Server is running on port ${PORT}`)
});