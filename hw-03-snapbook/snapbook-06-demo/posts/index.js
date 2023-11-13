import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import { randomBytes } from 'crypto';
import Store from './store.js';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.get('/posts', (req, res) => {
  console.log(`(${process.pid}) Posts Service: GET /posts`);
  const posts = Store.read();
  console.log(`(${process.pid}) Posts Service: ${JSON.stringify(posts)}`);
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  const posts = Store.read();
  console.log(`(${process.pid}) Posts Service: ${JSON.stringify(posts)}`);

  posts[id] = { id, title };
  Store.write(posts);

  try {
    await fetch('http://localhost:4005/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'PostCreated',
        data: {
          id,
          title,
        },
      }),
    });
  } catch (err) {
    console.log(`(${process.pid}) Posts Service: ${err}`);
    res.status(500).send({
      status: 'ERROR',
      message: err,
    });
  }

  res.status(201).send(posts[id]);
  console.log(`(${process.pid}) Posts Service: ${JSON.stringify(posts)}`);
});

app.post('/events', async (req, res) => {
  const event = req.body;
  const type = event.type;
  console.log(`(${process.pid}) Posts Service Received Event: ${type}`);
  res.send({});
});

const emitPostCreatedEvent = async (res, id, title) => {};

app.listen(4000, () => {
  console.log(`(${process.pid}) Posts Service: Listening on 4000`);
});
