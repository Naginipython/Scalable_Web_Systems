import express from 'express';
import bcrypt from 'bcrypt';
import malScraper from 'mal-scraper';
import { insecureUserDatabase } from '../index.js';
import auth_user_middleware from '../modules/auth_user_middleware.js';
import { logger } from '../index.js';

const router = express.Router();

// POST newuser (creates a new user)
router.post('/newuser', (req, res) => {
    const json = req.body;
    const saltRounds = 10;

    if (json.hasOwnProperty('username') && json.hasOwnProperty('password')) {
        const username = json['username'];
        if (insecureUserDatabase.every(x => x.username != username)) {
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(json['password'], salt, (err, hash) => {
                    insecureUserDatabase.push({
                        username: username,
                        password: json['password'],
                        hash: hash,
                        public: json.hasOwnProperty('public')? json['public'] : true,
                        anime: []
                    });
                    logger.info("New user was created");
                    res.send("User has been created");
                });
            });
        } else {
            throw new Error("Error: username already used");
        }
    } else {
        throw new Error("Error: POST didn't include username and/or password");
    }

});

// POST user/anime (creates a new entry to database)
router.post('/:user/anime', auth_user_middleware, async (req, res) => {
    const { user } = req.params;
    const json = req.body;
    
    if (
        (json.hasOwnProperty('name') || json.hasOwnProperty('id') || json.hasOwnProperty('url')) &&
        json.hasOwnProperty('review') &&
        json.hasOwnProperty('plotRank') &&
        json.hasOwnProperty('charRank') &&
        json.hasOwnProperty('creativeRank') &&
        json.hasOwnProperty('interestRank') &&
        json.hasOwnProperty('artRank')
    ) {
        // Finally, checking for correct data
        if (
            !isNaN(parseInt(json['plotRank'])) &&
            !isNaN(parseInt(json['charRank'])) &&
            !isNaN(parseInt(json['creativeRank'])) &&
            !isNaN(parseInt(json['interestRank'])) &&
            !isNaN(parseInt(json['artRank']))
        ) {
            // Building Anime
            let temp;
            if (json.hasOwnProperty('url')) {
                temp = await malScraper.getInfoFromURL(json['url']);
            } else if (json.hasOwnProperty('id')) {
                temp = await malScraper.getInfoFromURL(`https://myanimelist.net/anime/${json['id']}`);
            } else {
                temp = await malScraper.getInfoFromName(json['name']);
            }
            const userData = insecureUserDatabase.find(x => x.username == user);
            if (userData['anime'].every(x => x.name != temp.title)) {
                let rank = (parseInt(json['plotRank']) + parseInt(json['charRank']) + parseInt(json['creativeRank']) + parseInt(json['interestRank']) + parseInt(json['artRank']))/5.0;
                let anime = {
                    url: temp.url,
                    name: temp.title,
                    description: temp.synopsis,
                    review: json['review'],
                    plot_rank: parseInt(json['plotRank']),
                    char_rank: parseInt(json['charRank']),
                    creative_rank: parseInt(json['creativeRank']),
                    interest_rank: parseInt(json['interestRank']),
                    art_rank: parseInt(json['artRank']),
                    rank: rank
                };
                
                userData['anime'].push(anime);
                res.json(anime);
            } else {
                throw new Error("ERROR: Anime already in database");
            }
        } else {
            throw new Error("ERROR: One or all is not a number: plotRank, charRank, creativeRank, interestRank, artRank")
        }
    } else {
        throw new Error("ERROR: json must include all fields: name/id/url, review, plotRank, charRank, creativeRank, interestRank, and artRank");
    }
});

export default router;