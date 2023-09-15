// index.js
import express from 'express';
import router from './routes/routes.js';
import apiRouter from './routes/api.js';

const app = express();
const port = process.env.PORT || 3000;

//routes
app.use('/', router);
app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});