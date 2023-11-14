import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import { randomBytes } from 'crypto';
import Store from './store.js';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.get('/posts/:id/comments', (req, res) => {
  console.log(`(${process.pid}) Comments Service: GET /posts/:id/comments`);
  const commentsByPostId = Store.read();
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  console.log(`(${process.pid}) Comments Service: POST /posts/:id/comments`);
  const { content } = req.body;
  const id = randomBytes(4).toString('hex');

  const commentsByPostId = Store.read();
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id, content });
  commentsByPostId[req.params.id] = comments;
  Store.write(commentsByPostId);

  try {
    await fetch('http://localhost:4005/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'CommentCreated',
        data: {
          id,
          content,
          postId: req.params.id,
        },
      }),
    });
  } catch (err) {
    console.log(`(${process.pid}) Comments Service: ${err}`);
    res.status(500).send({
      status: 'ERROR',
      message: err,
    });
  }

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  const event = req.body;
  const type = event.type;

  console.log(`(${process.pid}) Comments Service Received Event: ${type}`);

  res.send({});
});

const emitCommentCreatedEvent = async (res, id, content, postId) => {};

app.listen(4001, () => {
  console.log(`(${process.pid}) Comments Service: Listening on 4001`);
});
