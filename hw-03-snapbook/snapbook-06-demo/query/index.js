import express from 'express';
import cors from 'cors';
import Store from './store.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/posts', (req, res) => {
  const posts = Store.read();
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  const posts = Store.read();
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;
    console.log(`post id = ${postId}`);
    const post = posts[postId];
    console.log(post);
    post.comments.push({ id, content });
  }
  Store.write(posts);

  console.log(posts);

  res.send({ status: 'OK' });
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
