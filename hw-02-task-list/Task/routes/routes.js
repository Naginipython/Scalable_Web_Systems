import express from 'express';
import { logger, errLogger } from '../logger/logger.js';

const router = express.Router();

let id = 0;
const tasks = {};

router.post('/add', (req, res) => {
    const { task } = req.body;

    if (task == undefined) {
        const err = "'task' field is required";
        errLogger.error({ message: err, data: req.body});
        res.status(400).send("Error: "+err);
    }

    tasks[id++] = task;
    const oldId = id-1;
    const reply = "Task created successfully";
    logger.info({message: reply, pid: process.ppid});
    res.status(200).json({ message: reply, id: oldId, task: tasks[oldId]});
});

router.delete('/remove', (req, res) => {
    const { id } = req.body;

    if (id == undefined) {
        const err = "'id' field is required";
        errLogger.error({ message: err, data: req.body, pid: process.pid});
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