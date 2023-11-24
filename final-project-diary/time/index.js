import express from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';
import morgan from 'morgan';
import strtime from 'strftime';
import store from './store.js';

const app = express();
const port = 3001;

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.get('/days', (req, res) => {
    console.log(`(${process.pid}) Time Service: GET /days`);
    const times = store.read();
    console.log(`(${process.pid}) Time Service: ${JSON.stringify(times)}`);
    res.json(times);
})

app.post('/event', async (req, res) => {
    const { type, data } = req.body;
    const times = store.read();
    console.log(`(${process.pid}) Time Service Received Event: ${type}`);

    if (type == "entryCreated") {
        let date = strtime('%m/%d/%y');
        let day = [];
        if (times.hasOwnProperty(date)) {
            day = times[date].day;
        }
        
        let time = strtime('%I:%M %P');
        day.push({id: data.id, entry: data.entry, time});
        times[date] = { date, day };

        try {
            await fetch(`http://localhost:3005/event`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    type: 'timeCreated',
                    data: times[date],
                }),
            });
        } catch (err) {
            console.log(`(${process.pid}) Time Service: ${err}`);
            res.status(500).send({ status: 'ERROR', message: err });
        }
    }

    store.write(times);

    res.send({ status: 'OK' });
});

app.listen(port, () => {
    console.log(`(${process.pid}) Time Service is listening on localhost:${port}`);
});