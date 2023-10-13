import express from 'express';
import bcrypt from 'bcrypt';
import malScraper from 'mal-scraper';
import { insecureUserDatabase } from '../index.js';
import auth_user_middleware from '../modules/auth_user_middleware.js';

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
                    throw new Error("ERROR: plotRank is not a number");
                }
            }
            if (json.hasOwnProperty('charRank')) {
                if (!isNaN(parseInt(json['charRank']))) {
                    animeToUpdate.char_rank = json['charRank'];
                } else {
                    throw new Error("ERROR: charRank is not a number");
                }
            }
            if (json.hasOwnProperty('creativeRank')) {
                if (!isNaN(parseInt(json['creativeRank']))) {
                    animeToUpdate.creative_rank = json['creativeRank'];
                } else {
                    throw new Error("ERROR: creativeRank is not a number");
                }
            }
            if (json.hasOwnProperty('interestRank')) {
                if (!isNaN(parseInt(json['interestRank']))) {
                    animeToUpdate.interest_rank = json['interestRank'];
                } else {
                    throw new Error("ERROR: interestRank is not a number");
                }
            }
            if (json.hasOwnProperty('artRank')) {
                if (!isNaN(parseInt(json['artRank']))) {
                    animeToUpdate.art_rank = json['artRank'];
                } else {
                    throw new Error("ERROR: artRank is not a number");
                }
            }
            animeToUpdate.rank = (animeToUpdate.plot_rank + animeToUpdate.char_rank + animeToUpdate.creative_rank + animeToUpdate.interest_rank + animeToUpdate.art_rank)/5.0;
            res.json(animeToUpdate);
        } else {
            throw new Error("ERROR: Anime not in database");
        }
    } else {
        throw new Error("ERROR: JSON must contain a name, url, or id");
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
            throw new Error("ERROR: Username already used.");
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
            throw new Error("ERROR: togglePublic is not true/false")
        }

    }
    res.send(`${s} has been updated`);
});

export default router;