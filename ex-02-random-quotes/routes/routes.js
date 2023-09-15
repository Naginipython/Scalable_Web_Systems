// routes.js
import express from 'express';
import {viewHTML} from '../views/views.js';
import { random, randomN, randomAuthor, randomMatch } from '../modules/random_quotes.js';
const router = express.Router();

router.get('/quote', async (req, res) => {
    let q = await getQuote(req);
    viewHTML(res, q);
});

export async function getQuote(req) {
    let author = req.query.author || "";
    let quote = req.query.quote || "";
    
    let q;
    if (author != "") {
        q = await randomAuthor(author);

    } else if (quote != "") {
        q = await randomMatch(quote);
    } else {
        q = []
        let randQuote = await random()
        q.push(randQuote);
    }
    return q;
}

router.get('/quote/:n', async (req, res) => {
    let quotes = await randomN(req.params.n);
    viewHTML(res, quotes);
});

export default router;