import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import { randomBytes } from 'crypto';
import Store from './store.js';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.get('/comments/:id/votes', (req, res) => {
  console.log(`(${process.pid}) Votes Service: GET /comments/:id/votes`);
  const votesByCommentId = Store.read();
  res.send(votesByCommentId[req.params.id] || {});
});

app.post('/posts/:postId/comments/:id/votes', async (req, res) => {
  console.log(`(${process.pid}) Votes Service: POST /comments/:id/votes`);
  const { vote } = req.body;
  const { postId, id } = req.params;

  const votesByCommentId = Store.read();
  let votesObj;
  if (votesByCommentId.hasOwnProperty(id)) {
    votesObj = votesByCommentId[id]
    votesObj.votes += parseInt(vote);
  } else {
    votesObj = { commentId: id, votes: vote };
  }
  votesByCommentId[id] = votesObj;
  Store.write(votesByCommentId);

  try {
    await fetch('http://localhost:4005/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'CommentVoted',
        data: {
            id: id,
            postId: postId,
            votes: votesObj.votes,
        },
      }),
    });
  } catch (err) {
    console.log(`(${process.pid}) Votes Service: ${err}`);
    res.status(500).send({
      status: 'ERROR',
      message: err,
    });
  }

  res.status(201).send( { votes: votesObj.votes } );
});

app.post('/events', async (req, res) => {
    const event = req.body;
    const type = event.type;

    console.log(`(${process.pid}) Votes Service Received Event: ${type}`);

    if (type === "CommentCreated") {
        event.data["votes"] = 0;

        const votesByCommentId = {}
        votesByCommentId[event.data["id"]] = { id: event.data["id"], votes: 0 };
        Store.write(votesByCommentId);

        try {
            await fetch('http://localhost:4005/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'CommentVoteSet',
                    data: event.data,
              }),
            });
        } catch (err) {
            console.log(`(${process.pid}) Votes Service: ${err}`);
            res.status(500).send({
                status: 'ERROR',
                message: err,
            });
        }
    }

    res.send({});
});

app.listen(4004, () => {
  console.log(`(${process.pid}) Votes Service: Listening on 4004`);
});
