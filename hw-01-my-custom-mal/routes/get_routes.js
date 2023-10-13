import express from 'express';
import malScraper from 'mal-scraper'; // https://www.npmjs.com/package/mal-scraper
import { insecureUserDatabase } from '../index.js';
import authentication from '../modules/authentication.js';


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
    const data = await malScraper.getResultsFromSearch(search, type);
    res.json(data);
});

// GET user (gets a user's database)
router.get('/:user', async (req, res) => {
    const { user } = req.params;

    const userData = insecureUserDatabase.find(x => x.username == user);
    if (userData != undefined) {
        if (!userData.public) {
            //If it isn't then I need to make sure the request contains a user's login data
            const json = req.body;
            if (json.hasOwnProperty('username') && json.hasOwnProperty('password')) {
                // Checks if username/password checks out
                const auth = await authentication(json['username'], json['password']);
                if (auth.result) {
                    res.json(userData.anime);
                } else {
                    throw new Error(`ERROR: ${auth.reason}`);
                }
            } else {
                throw new Error("ERROR: User is not public. Please GET with a username & password json body");
            }
        } else {
            res.json(userData.anime);
        }
    } else {
        throw new Error("ERROR: User not found");
    }
});

export default router;