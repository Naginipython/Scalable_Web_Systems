import { describe, it, before } from 'node:test';
import assert from 'node:assert';

// node --test

describe("PUT user anime operations", async () => {
    const newUser = { "username": "put_user_anime", "password": "password" };
    const newAnime = {
        "username": "put_user_anime",
        "password": "password",
        "name": "Akame ga Kill!",
        "review": "best anime",
        "plotRank": 10,
        "charRank": 10,
        "creativeRank": 10,
        "interestRank": 10,
        "artRank": 10
    };
    const updateAnime = {
        "username": "put_user_anime",
        "password": "password",
        "name": "Akame ga Kill!",
        "review": "#1"
    }
    const badUpdateAnime = {
        "username": "put_user_anime",
        "password": "password",
        "name": "Katanagatari",
        "plotRank": 10
    }
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
        let init_response2 = await fetch("http://localhost:3000/api/put_user_anime/anime", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAnime)
        });

        response = await fetch("http://localhost:3000/api/put_user_anime/anime", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateAnime)
        });
        body = await response.text();

        // FAILS
        
        failedResponse = await fetch(`http://localhost:3000/api/put_user_anime/anime`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(badUpdateAnime)
        });

        badUpdateAnime.plotRank = "ten";
        failedResponse2 = await fetch(`http://localhost:3000/api/put_user_anime/anime`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(badUpdateAnime)
        });

        failedResponse3 = await fetch(`http://localhost:3000/api/put_user_anime/anime`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": "put_user_anime",
                "password": "password"
            })
        });
    })

    it('should respond with 200', async () => {
        assert.equal(response.status, 200);
    });
    
    it('should an array with anime', async () => {
        assert.notEqual(body, null);
        const json = JSON.parse(body);
        assert.equal(json.name, newAnime.name);
        assert.equal(json.review, updateAnime.review);
        assert.equal(json.char_rank, newAnime.charRank);
    });

    it('should fail if anime doesn\'t exists', async () => {
        assert.equal(failedResponse.status, 500);
    });

    it('should fail if [plot/char/creative/interest/art]Rank is not a number', async () => {
        assert.equal(failedResponse2.status, 500);
    });

    it('should fail if it doesn\'t contain right fields', async () => {
        assert.equal(failedResponse3.status, 500);
    });
});