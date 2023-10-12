import express from 'express';
import malScraper from 'mal-scraper'; // https://www.npmjs.com/package/mal-scraper
import auth_user_middleware from '../modules/auth_user_middleware.js';
import { insecureUserDatabase } from '../index.js';

const router = express.Router();
const type = 'anime';

// GET animes/seasonal (gets the seasonal shows)
router.get('/anime/seasonal', async (req, res) => {
    const year = req.query['year'] || 2023; //current year as of this code
    const season = req.query['season'] || "fall"; //current season as of this code
    console.log(`${season} ${year}`);
    const data = await malScraper.getSeason(year, season);
    res.json(data);
});

// GET anime/:search (searches a certain query)
router.get('/anime/:search', async (req, res) => {
    const {search} = req.params;
    console.log(search);
    const temp2 = await malScraper.getInfoFromName("Demon slayer entertainment");
    const data = await malScraper.getResultsFromSearch(search, type);
    res.json(temp2);
});

// GET user (gets a user's database)
router.get('/:user', auth_user_middleware, (req, res) => {
    const { user } = req.params;
    const json = req.body;
    // TODO: List User's Database
    const userData = insecureUserDatabase.find(x => x.username == user);
    res.json(userData.anime);
});

export default router;