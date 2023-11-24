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
        content[data['date']] = data;
    }
    if (type == "tagAdded") {
        const { id } = req.body;
        for (let key of Object.keys(content)) {
            console.log(content[key]['day']);
            if (content[key]['day'].some(x => x.id == id)) {
                const obj = content[key]['day'].find(x => x.id == id);
                console.log(obj);
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