import express from 'express';
import { logger, errLogger } from '../logger/logger.js';

const router = express.Router();

const isCompletedObj = {};

router.post('/add', async (req, res) => {
    const response = await fetch(`http://localhost:3000/api/add`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    });
    if (response.status == 200) {
        const body = await response.json();
        const id = body.id;
        isCompletedObj[id] = false;
        const reply = "Task created successfully";
        logger.info({message: reply, pid: process.ppid});
        res.status(200).json({ message: reply, id: id });
    } else {
        const err = "task api offline or sent bad data";
        errLogger.error({ message: err, pid: process.pid });
        res.status(500).send("Error: "+err);
    }
});

router.delete('/remove', async (req, res) => {
    const response = await fetch(`http://localhost:3000/api/remove`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    });

    if (response.status == 200) {
        const { id } = req.body;
        const reply = "Task deleted successfully";
        logger.info({message: reply, pid: process.ppid});
        delete isCompletedObj[id];
        res.status(200).send(reply);
    } else {
        const err = await response.text();
        errLogger.error({ message: err });
        res.status(response.status).send(err);
    }
    
});

router.get('/list', async (req, res) => {
    const response = await fetch(`http://localhost:3000/api/list`);

    if (response.status == 200) {
        const body = await response.json();
        logger.info({message: "Received list", pid: process.ppid})
        // [ {id, name, isChecked} ]
        // Create data to send
        const arr = [];
        for (const data in body) {
            let isChecked = false;
            if (isCompletedObj.hasOwnProperty(data)) {
                isChecked = isCompletedObj[data];
            }
            arr.push({
                id: data,
                name: body[data],
                isChecked: isChecked
            })
        }
        res.json(arr);
    } else {
        const err = "Could not retrieve list. Task API may be offline";
        errLogger.error({ message: err });
        res.status(500).send("Error: "+err);
    }
});

router.get('/count', (req, res) => {
    const result = { completed: 0, not_completed: 0 };
    for (const x in isCompletedObj) {
        isCompletedObj[x]? result.completed++ : result.not_completed++;
    }
    res.json(result);
});

router.post('/toggle', (req, res) => {
    const { toggle, id } = req.body;
    if (toggle == undefined || id == undefined) {
        const err = "'isChecked' and 'id' fields are required";
        errLogger.error({ message: err, data: req.body});
        res.status(400).send("Error: "+err);
    }

    isCompletedObj[id] = toggle;
    const reply = "Task toggled successfully";
    logger.info({message: reply, pid: process.ppid});
    res.status(200).json({ message: reply });
});

export default router;