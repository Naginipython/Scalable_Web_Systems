import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello Docker! I made a change!');
});

app.listen(port, () => {
  console.log(`EX-19 app listening at http://localhost:${port}`);
});