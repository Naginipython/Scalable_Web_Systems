import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import store from './store.js';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

const bannedWords = ["fuck", "shit", "bitch", "damn", "crap"];

app.post('/events', async (req, res) => {
    const event = req.body;
    const type = event.type;

    console.log(`(${process.pid}) Moderator Service Received Event: ${type}`);

    if (type == "CommentCreated") {
        // loop through content
        const wordsArr = event.data.content.toLowerCase().split(' ');
        // if comment contains a banned word
        const modStatus = wordsArr.every(x => bannedWords.includes(x))?
            "Rejected" : "Accepted";
        
        console.log(wordsArr);
        console.log(modStatus);
        event.data["status"] = modStatus;

        try {
            await fetch('http://localhost:4005/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'CommentModerated',
                    data: event.data,
              }),
            });
        } catch (err) {
            console.log(`(${process.pid}) Moderator Service: ${err}`);
            res.status(500).send({
                status: 'ERROR',
                message: err,
            });
        }
    }

    res.send({});
});

app.listen(4003, () => {
    console.log(`(${process.pid}) Moderator Service: Listening on 4003`);
});