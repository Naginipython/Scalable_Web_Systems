import express from 'express';
import malScraper from 'mal-scraper';
import { insecureUserDatabase } from '../index.js';
import auth_user_middleware from '../modules/auth_user_middleware.js';
import { logger, errLogger } from '../logger/logger.js';

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
            const err = "Anime not in database";
            errLogger.error({ message: err, userData: json});
            res.status(500).send({ "Error": err });
        }
    } else {
        const err = "Must include name, id, or url";
        errLogger.error({ message: err, userData: json});
        res.status(500).send({ "Error": err });
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

                    const reply = `${user} has been deleted`;
                    logger.info({message: reply, userData: json});
                    res.send(reply);
                }
            } else {
                const err = "'acknowledgement' must be true to proceed";
                errLogger.error({ message: err, userData: json});
                res.status(500).send({ "Error": err });
            }
        } else {
            const err = "'acknowledgement' must be true/false";
            errLogger.error({ message: err, userData: json});
            res.status(500).send({ "Error": err });
        }
    } else {
        const err = "Body must include 'acknowledgement' boolean";
        errLogger.error({ message: err, userData: json});
        res.status(500).send({ "Error": err });
    }
});

export default router;