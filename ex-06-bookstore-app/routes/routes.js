// routes.js
import express from 'express';
import fs from 'fs';
import bookStore from '../books.json' assert { "type": "json" };

const router = express.Router();

router.get('/books', (req, res) => {
    res.send(bookStore);
});

router.get('/books/:id', (req, res) => {
    let { id } = req.params;
    // let newArr = [];
    for (let b in bookStore) {
        if (bookStore[b].id == id) {
            res.send(bookStore[b]);
        }
    }
    res.send("");
});

router.post('/books', (req, res) => {
    let book = req.body;
    let { id } = req.params;
});

router.put('/books/:id', (req, res) => {
    let book = req.body;
    let { id } = req.params;
});

router.delete('/books/:id', (req, res) => {
    let { id } = req.params;
    for (let b in bookStore) {
        if (bookStore[b].id == id) {
            bookStore.splice(b, 1);
        }
    }
    res.send(bookStore);
});

export default router;