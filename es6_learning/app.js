import express from 'express';
import router from './index.js';

const app = express();

//Map router to specific path
app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Welcome to the kingdom of Express!');
});

app.get('/about', (req, res) => {
  res.send('Welcome to the Chronicles of Knowledge, where legends are born!');
});

app.get('/contact', (req, res) => {
    res.send('Reach out to us, and together, we shall conquer new frontiers!')
});

//Start the server
app.listen(3000, () => {
    console.log('The server is running on port 3000');
});

//Go to `localhost:3000/` to view the app.
//Go to `localhost:3000/api/` to views things in index.js.
//Note if I wanted to, I can put every `app.get()` into a separate file and use it like index.js