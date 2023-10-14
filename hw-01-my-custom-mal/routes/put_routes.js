import express from 'express';
import bcrypt from 'bcrypt';
import malScraper from 'mal-scraper';
import { insecureUserDatabase } from '../index.js';
import auth_user_middleware from '../modules/auth_user_middleware.js';
import { logger, errLogger } from '../logger/logger.js';

const router = express.Router();

// PUT user/anime (updates an entry)
router.put('/:user/anime', auth_user_middleware, async (req, res) => {
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
        const animeToUpdate = userData['anime'].find(x => x.name == temp.title);
        if (animeToUpdate != undefined) {
            if (json.hasOwnProperty('review')) {
                animeToUpdate.review = json['review'];
            }
            if (json.hasOwnProperty('plotRank')) {
                if (!isNaN(parseInt(json['plotRank']))) {
                    animeToUpdate.plot_rank = json['plotRank'];
                } else {
                    const err = "plotRank is not a number";
                    errLogger.error({ message: err, userData: json});
                    res.status(500).send({ "Error": err });
                }
            }
            if (json.hasOwnProperty('charRank')) {
                if (!isNaN(parseInt(json['charRank']))) {
                    animeToUpdate.char_rank = json['charRank'];
                } else {
                    const err = "charRank is not a number";
                    errLogger.error({ message: err, userData: json});
                    res.status(500).send({ "Error": err });
                }
            }
            if (json.hasOwnProperty('creativeRank')) {
                if (!isNaN(parseInt(json['creativeRank']))) {
                    animeToUpdate.creative_rank = json['creativeRank'];
                } else {
                    const err = "creativeRank is not a number";
                    errLogger.error({ message: err, userData: json});
                    res.status(500).send({ "Error": err });
                }
            }
            if (json.hasOwnProperty('interestRank')) {
                if (!isNaN(parseInt(json['interestRank']))) {
                    animeToUpdate.interest_rank = json['interestRank'];
                } else {
                    const err = "interestRank is not a number";
                    errLogger.error({ message: err, userData: json});
                    res.status(500).send({ "Error": err });
                }
            }
            if (json.hasOwnProperty('artRank')) {
                if (!isNaN(parseInt(json['artRank']))) {
                    animeToUpdate.art_rank = json['artRank'];
                } else {
                    const err = "artRank is not a number";
                    errLogger.error({ message: err, userData: json});
                    res.status(500).send({ "Error": err });
                }
            }
            animeToUpdate.rank = (animeToUpdate.plot_rank + animeToUpdate.char_rank + animeToUpdate.creative_rank + animeToUpdate.interest_rank + animeToUpdate.art_rank)/5.0;

            const reply = `${user} has updated ${temp.title}`;
            logger.info({message: reply, userData: json});
            res.json(animeToUpdate);
        } else {
            const err = "Anime not in database";
            errLogger.error({ message: err, userData: json});
            res.status(500).send({ "Error": err });
        }
    } else {
        const err = "JSON must contain a name, url, or id";
        errLogger.error({ message: err, userData: json});
        res.status(500).send({ "Error": err });
    }
});

// PUT user (updates for user)
router.put('/:user', auth_user_middleware, async (req, res) => {
    const { user } = req.params;
    const json = req.body;
    const userData = insecureUserDatabase.find(x => x.username == user);

    let s = "";
    if (json.hasOwnProperty('newUsername')) {
        if (insecureUserDatabase.every(x => x.username != json['newUsername'])) {
            userData.username = json['newUsername'];
            s += "Username";
        } else {
            const err = "Username already used";
            errLogger.error({ message: err, userData: json});
            res.status(500).send({ "Error": err });
        }
    }
    if (json.hasOwnProperty('newPassword')) {
        userData.password = json['newPassword'];
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(json['newPassword'], salt, (err, hash) => {
                userData.hash = hash;
            });
        });
        if (s != "") {
            s += ", ";
        }
        s += "Password";
    }
    if (json.hasOwnProperty('togglePublic')) {
        if (typeof json['togglePublic'] == "boolean") {
            userData.public = json['togglePublic'];
            if (s != "") {
                s += ", ";
            }
            s += "Publicity";
        } else {
            const err = "togglePublic is not true/false";
            errLogger.error({ message: err, userData: json});
            res.status(500).send({ "Error": err });
        }

    }
    res.send(`${s} has been updated`);
});

export default router;