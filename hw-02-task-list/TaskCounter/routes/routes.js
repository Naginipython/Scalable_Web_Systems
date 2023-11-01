import express from 'express';
import { logger, errLogger } from '../logger/logger.js';

const router = express.Router();

let id = 0;
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
        const oldId = id;
        isCompletedObj[id++] = false;
        const reply = "Task created successfully";
        logger.info({message: reply, pid: process.ppid});
        res.status(200).send(`${reply}. Id: ${oldId}`);
    } else {
        res.status(500).send("Error: task api offline or sent bad data");
    }
});

router.delete('/remove', (req, res) => {
    const { id } = req.body;

    if (id == undefined) {
        const err = "'id' field is required";
        errLogger.error({ message: err, data: req.body});
        res.status(400).send("Error: "+err);
    }

    if (!tasks.hasOwnProperty(id)) {
        const err = "id is not in data";
        errLogger.error({ message: err, data: id});
        res.status(404).send("Error: "+err);
    }
    
    const reply = "Task deleted successfully";
    logger.info({message: reply, pid: process.ppid});
    delete tasks[id];
    res.status(200).send(reply);
});

router.get('/list', (req, res) => {
    logger.info({message: "Received list", pid: process.ppid})
    res.json(tasks);
});

export default router;