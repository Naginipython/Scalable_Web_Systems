import express from 'express';
import malScraper from 'mal-scraper';
import { insecureUserDatabase } from '../index.js';
import auth_user_middleware from '../modules/auth_user_middleware.js';

const router = express.Router();

// DELETE user/anime (Deletes an entry)
router.delete('/:user/anime', auth_user_middleware, async (req, res) => {
    const { user } = req.params;
    const json = req.body;

    if (json.hasOwnProperty('name') || json.hasOwnProperty('id') || json.hasOwnProperty('url')) {
        let temp;
        if (json.hasOwnProperty('url')) {
            temp = await malScraper.getInfoFromURL(json['url']);
        } else if (json.hasOwnProperty('id')) {
            temp = await malScraper.getInfoFromURL(`https://myanimelist.net/anime/${json['id']}`);
        } else {
            temp = await malScraper.getInfoFromName(json['name']);
        }
        const userData = insecureUserDatabase.find(x => x.username == user);
        const animeToDeleteIndex = userData['anime'].findIndex(x => x.name == temp.title);
        if (animeToDeleteIndex != -1) {
            userData['anime'].splice(animeToDeleteIndex, 1);
            res.send(`${temp.title} was deleted from user's anime`)
        } else {
            throw new Error("ERROR: Anime not in database")
        }
    }
});

// DELETE user (deletes user)
router.delete('/:user', auth_user_middleware, async (req, res) => {
    const { user } = req.params;
    const json = req.body;

    if (json.hasOwnProperty('acknowledgement')) {
        if (typeof json['acknowledgement'] == "boolean") {
            if (json['acknowledgement']) {
                const userDataIndex = insecureUserDatabase.findIndex(x => x.username == user);
                if (userDataIndex != -1) {
                    insecureUserDatabase.splice(userDataIndex, 1);
                    res.send(`${user} has been deleted`);
                }
            } else {
                throw new Error("ERROR: 'acknowledgement' must be true to proceed.");
            }
        } else {
            throw new Error("ERROR: 'acknowledgement' must be true/false");
        }
    } else {
        throw new Error("ERROR: Body must include 'acknowledgement' boolean");
    }
});

export default router;