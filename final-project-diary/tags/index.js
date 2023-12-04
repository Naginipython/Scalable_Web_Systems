import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import store from './store.js';
import { errLogger, logger } from './logger.js';

const app = express();
const port = 3002;

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

const colors = ["red", "orange", "yellow", "green", "blue", "purple"];
let prev_color = -1;

app.get('/:entryId/tags', (req, res) => {
    console.log(`(${process.pid}) Tags Service: GET /content`);
    const { entryId } = req.params;
    const tags = store.read();
    console.log(`(${process.pid}) Tags Service: ${JSON.stringify(tags)}`);
    if (tags.hasOwnProperty(entryId)) 
        res.json(tags[entryId]);
    else
        res.json([]);
})

app.post('/create_tag/:tag', async (req, res) => {
    const { tag } = req.params;
    const lowerTag = tag.toLowerCase();
    const t = store.read();

    // TODO optional: fix this same-as-next-color thing
    let color;
    do {
        color = Math.floor(Math.random()*6);
    } while (color == prev_color);
    prev_color = color;
    console.log(prev_color);
    
    if (!t.hasOwnProperty('tags')) {
        store.write({tags: []});
    }
    
    const tags = store.read();
    console.log(`(${process.pid}) Tags Service: ${JSON.stringify(tags.tags)}`)
    
    if (tags.tags.some(x => x.t == lowerTag)) {
        res.status(400).send("ERROR: tag exists");
    } else {
        tags.tags.push({ t: lowerTag, c: colors[color] });
        store.write(tags);
        const reply = `Tag has been created: '${lowerTag}'`;
        console.log(reply);
        logger.info({message: reply, pid: process.pid});
        
        try {
            await fetch(`http://localhost:3005/event`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    type: 'tagCreated',
                    data: lowerTag,
                }),
            });
        } catch (err) {
            console.log(`(${process.pid}) Content Service: ${err}`);
            const e = `Tag Service receieved an Error: ${err}`;
            errLogger.error({ message: e, pid: process.pid });
            res.status(500).send({ status: 'ERROR', message: err });
        }
    
        res.json(lowerTag);
    }
});

app.post('/tag/:contentId/:tag', async (req, res) => {
    const { contentId, tag } = req.params;
    const tags = store.read();

    console.log(`(${process.pid}) Tags Service: ${JSON.stringify(tags)}`);

    const tag_index = tags.tags.findIndex(x => x.t == tag.toLowerCase());
    console.log(tag_index);

    if (tag_index == -1) {
        res.status(400).send("ERROR: tag doesn't exist");
    } else {
        if (!tags.hasOwnProperty(contentId)) {
            tags[contentId] = [];
        }
        
        if (tags[contentId].some(x => x.t == tag.toLowerCase())) {
            res.status(400).send("ERROR: tag exists");
        } else {
            tags[contentId].push(tags.tags[tag_index]);
            store.write(tags);
            const reply = `Tag has been added: {'id': '${contentId}', 'tag': '${tag.toLowerCase()}'}`;
            console.log(reply);
            logger.info({message: reply, pid: process.pid});
            
            try {
                await fetch(`http://localhost:3005/event`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        type: 'tagAdded',
                        data: tags[contentId],
                        id: contentId
                    }),
                });
            } catch (err) {
                console.log(`(${process.pid}) Tag Service: ${err}`);
                const e = `Tag Service receieved an Error: ${err}`;
                errLogger.error({ message: e, pid: process.pid });
                res.status(500).send({ status: 'ERROR', message: err });
            }
        
            res.json(tags.tags[tag_index]);
        }
    }
});

app.post('/event', async (req, res) => {
    const event = req.body;
    console.log(`(${process.pid}) Tags Service Received Event: ${event.type}`);
    res.send({});
});

app.listen(port, () => {
    console.log(`(${process.pid}) Tags Service is listening on localhost:${port}`);
});