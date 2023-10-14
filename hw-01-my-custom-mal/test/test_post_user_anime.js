import { describe, it, before } from 'node:test';
import assert from 'node:assert';

// node --test

describe("POST user anime operations", async () => {
    const newUser = { "username": "post_user_anime", "password": "password" };
    const newAnime = {
        "username": "post_user_anime",
        "password": "password",
        "name": "Akame ga Kill!",
        "review": "best anime",
        "plotRank": 10,
        "charRank": 10,
        "creativeRank": 10,
        "interestRank": 10,
        "artRank": 10
    };
    const badAnime = {
        "username": "post_user_anime",
        "password": "password",
        "name": "Akame ga Kill!",
        "review": "best anime",
        "plotRank": "ten",
        "charRank": 10,
        "creativeRank": 10,
        "interestRank": 10,
        "artRank": 10
    };
    let response;
    let body;
    let failedResponse;
    let failedResponse2;
    let failedResponse3;

    before(async () => {
        let init_response = await fetch("http://localhost:3000/api/newuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        let init_body = await init_response.text();

        response = await fetch("http://localhost:3000/api/post_user_anime/anime", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAnime)
        });
        body = await response.text();

        // FAILS

        failedResponse = await fetch("http://localhost:3000/api/post_user_anime/anime", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAnime)
        });

        failedResponse2 = await fetch("http://localhost:3000/api/post_user_anime/anime", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(badAnime)
        });

        failedResponse3 = await fetch("http://localhost:3000/api/post_user_anime/anime", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": "post_user_anime",
                "password": "password",
                "name": "Akame ga Kill"
            })
        });
    })

    it('should respond with 200', async () => {
        assert.equal(response.status, 200);
    })
    
    it('should return the new anime', async () => {
        assert.notEqual(body, null);
        const json = JSON.parse(body);
        assert.equal(json.name, newAnime.name);
        assert.equal(json.review, newAnime.review);
        assert.equal(json.char_rank, newAnime.charRank);
    });

    it('should fail if user already added anime', async () => {
        assert.equal(failedResponse.status, 500);
    });

    it('should fail if [plot/char/creative/interest/art]Rank is not a number', async () => {
        assert.equal(failedResponse2.status, 500);
    });

    it('should fail if all fields are not included', async () => {
        assert.equal(failedResponse3.status, 500);
    });
});