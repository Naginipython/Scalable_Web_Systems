import express from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';
import morgan from 'morgan';
import store from './store.js';
import { errLogger, logger } from './logger.js';

const app = express();
const port = 3000;

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.get('/content', (req, res) => {
    console.log(`(${process.pid}) Content Service: GET /content`);
    const content = store.read();
    console.log(`(${process.pid}) Content Service: ${JSON.stringify(content)}`);
    res.json(content);
})

app.post('/entry', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { entry } = req.body;
    const content = store.read();

    if (entry == undefined) {
        res.status(400).send("ERROR: 'entry' key in json not found.");
    } else {
        console.log(`(${process.pid}) Content Service: ${JSON.stringify(content)}`)
    
        content[id] = { id, entry };
        store.write(content);
        const reply = `Content Entry has been created: {'id': '${content[id].id}', 'entry': '${content[id].entry}}'`;
        console.log(reply);
        logger.info({message: reply, pid: process.pid});

        try {
            await fetch(`http://localhost:3005/event`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    type: 'entryCreated',
                    data: content[id],
                }),
            });
        } catch (err) {
            console.log(`(${process.pid}) Content Service: ${err}`);
            const e = `Content Service receieved an Error: ${err}`;
            errLogger.error({ message: e, pid: process.pid });
            res.status(500).send({ status: 'ERROR', message: err });
        }
    
        res.json(content[id]);
    }
});

app.post('/event', async (req, res) => {
    const event = req.body;
    console.log(`(${process.pid}) Content Service Received Event: ${event.type}`);
    res.send({});
});

app.listen(port, () => {
    console.log(`(${process.pid}) Content Service is listening on localhost:${port}`);
});