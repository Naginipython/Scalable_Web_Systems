import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import store from './store.js';

const app = express();
const port = 3003;

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.get('/content', (req, res) => {
    res.json(store.read());
});

app.post('/event', async (req, res) => {
    const { type, data } = req.body;

    const content = store.read();
    console.log(`(${process.pid}) Query Service: ${JSON.stringify(content)}`)
    if (type == "timeCreated") {
        let len = data['day'].length - 1;
        data['day'][len]['tags'] = [];
        if (content.hasOwnProperty(data['date'])) {
            content[data['date']]['day'].unshift(data['day'][len]);
        } else {
            content[data['date']] = data;
        }
        console.log(data);
    }
    if (type == "tagAdded") {
        const { id } = req.body;
        for (let key of Object.keys(content)) {
            if (content[key]['day'].some(x => x.id == id)) {
                const obj = content[key]['day'].find(x => x.id == id);
                obj['tags'] = data;
            }
        }
    }
    store.write(content);

    res.send({ status: 'OK' });
});

app.listen(port, () => {
    console.log(`(${process.pid}) Server is running on localhost:${port}`);
})