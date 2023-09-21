// index.js
import express from 'express';
import router from './routes/routes.js';
import math_routes from './routes/math-routes.js'

const app = express();
const port = process.env.PORT || 3000;

// Routes
app.use('/', router);
app.use('/', math_routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});