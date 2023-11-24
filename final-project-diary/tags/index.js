import express from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';
import morgan from 'morgan';
import store from './store.js';

const app = express();
const port = 3002;

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

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
    
    if (!t.hasOwnProperty('tags')) {
        store.write({tags: []});
    }
    
    const tags = store.read();
    console.log(`(${process.pid}) Tags Service: ${JSON.stringify(tags.tags)}`)
    
    if (tags.tags.includes(lowerTag)) {
        res.status(400).send("ERROR: tag exists");
    } else {
        tags.tags.push(lowerTag);
        store.write(tags);
        
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
            res.status(500).send({ status: 'ERROR', message: err });
        }
    
        res.json(lowerTag);
    }
});

app.post('/tag/:contentId/:tag', async (req, res) => {
    const { contentId, tag } = req.params;
    const tags = store.read();

    console.log(`(${process.pid}) Tags Service: ${JSON.stringify(tags)}`);

    if (!tags.tags.includes(tag)) {
        res.status(400).send("ERROR: tag doesn't exist");
    } else {
        if (!tags.hasOwnProperty(contentId)) {
            tags[contentId] = [];
        }
        if (tags[contentId].includes(tag)) {
            res.status(400).send("ERROR: tag exists");
        } else {
            tags[contentId].push(tag);
            store.write(tags);
            
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
                console.log(`(${process.pid}) Content Service: ${err}`);
                res.status(500).send({ status: 'ERROR', message: err });
            }
        
            res.json(tag);
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