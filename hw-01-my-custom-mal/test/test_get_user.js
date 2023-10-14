import { describe, it, before } from 'node:test';
import assert from 'node:assert';

// node --test

describe("GET user anime operations", async () => {
    const newUser = { "username": "get_user", "password": "password" };
    const newUser2 = { "username": "get_user2", "password": "password", "public": false };
    const newAnime = {
        "username": "get_user",
        "password": "password",
        "name": "Akame ga Kill!",
        "review": "best anime",
        "plotRank": 10,
        "charRank": 10,
        "creativeRank": 10,
        "interestRank": 10,
        "artRank": 10
    };
    let response;
    let response2;
    let body;
    let body2;
    let failedResponse;
    let failedResponse2;

    before(async () => {
        let init_response = await fetch("http://localhost:3000/api/newuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        let init_response2 = await fetch("http://localhost:3000/api/get_user/anime", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAnime)
        });
        console.log(`RESPONSE: ${init_response2.status}`);

        response = await fetch(`http://localhost:3000/api/${newUser.username}`);
        body = await response.text();

        // fetch doesn't support GET with body...
        // response2 = await fetch(`http://localhost:3000/api/${newUser2.username}`, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(newUser2)
        // });
        // body2 = await response2.text();

        // FAILS
        
        // failedResponse = await fetch(`http://localhost:3000/api/get_user3`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(newUser)
        // });

        // failedResponse2 = await fetch(`http://localhost:3000/api/${newUser2.username}`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(newUser)
        // });
    })

    it('should respond with 200', async () => {
        assert.equal(response.status, 200);
    });

    // it('should respond 200 to private user', async () => {
    //     assert.equal(response2.status, 200);
    // });
    
    it('should an array with anime', async () => {
        assert.notEqual(body, null);
        const json = JSON.parse(body);
        assert.equal(json[0].name, newAnime.name);
        assert.equal(json[0].review, newAnime.review);
        assert.equal(json[0].char_rank, newAnime.charRank);
    });

    // it('should fail if user isn\'t found', async () => {
    //     assert.equal(failedResponse.status, 500);
    // });

    // it('should fail if user isn\'t public', async () => {
    //     assert.equal(failedResponse2.status, 500);
    // });
});