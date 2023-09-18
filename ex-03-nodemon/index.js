// index.js
import express from 'express';
import router from './Routes/routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});