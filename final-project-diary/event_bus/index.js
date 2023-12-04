import express from 'express';
import morgan from 'morgan';
import errLogger from './logger.js';

const app = express();
const port = 3005;
const servicePorts = [3000, 3001, 3002, 3003];

app.use(morgan('tiny'));
app.use(express.json());

app.post('/event', async (req, res) => {
    const event = req.body;

    console.log(`(${process.pid}) Event Bus Receieved Event: ${event.type}`);

    for (const p of servicePorts) {
        console.log(`(${process.pid}) Event Bus Sent Event to ${p}: ${event.type}`);

        try {
            await fetch(`http://localhost:${p}/event`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(event),
            });
        } catch (err) {
            console.log(`(${process.pid}) Event Bus Service: ${err}`);
            const e = `Event Bus Service receieved an Error: ${err}`;
            errLogger.error({ message: e, pid: process.pid });
            res.status(500).send({ status: 'ERROR', message: err });
        }
    }
    res.send({ status: 'OK'});
});

app.listen(port, () => {
    console.log(`(${process.pid}) Event Bus is listening on localhost:${port}`);
});