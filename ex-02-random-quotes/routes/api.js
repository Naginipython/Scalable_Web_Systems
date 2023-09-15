// api.js
import express from 'express';
import { random, randomN, randomAuthor, randomMatch } from '../modules/random_quotes.js';
import { getQuote } from './routes.js';

const router = express.Router();

router.get('/quote', async (req, res) => {
    let quotes = await getQuote(req);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(quotes));
});

router.get('/quote/:n', async (req, res) => {
    let quotes = await randomN(req.params.n);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(quotes));
});

export default router;