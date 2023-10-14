import { describe, it, before } from 'node:test';
import assert from 'node:assert';

// node --test

describe("DELETE user anime operations", async () => {
    const newUser = { "username": "delete_user_anime", "password": "password" };
    const newAnime = {
        "username": "delete_user_anime", 
        "password": "password",
        "name": "Akame ga Kill!",
        "review": "best anime",
        "plotRank": 10,
        "charRank": 10,
        "creativeRank": 10,
        "interestRank": 10,
        "artRank": 10
    };
    const deleteAnime = { 
        "username": "delete_user_anime", 
        "password": "password",
        "name": "Akame ga Kill!"
    };
    const badDeleteAnime = {
        "username": "delete_user_anime", 
        "password": "password!"
    }
    let response;
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
        let init_response2 = await fetch("http://localhost:3000/api/delete_user_anime/anime", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAnime)
        });

        response = await fetch("http://localhost:3000/api/delete_user_anime/anime", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleteAnime)
        });

        // FAILS
        
        failedResponse = await fetch(`http://localhost:3000/api/delete_user_anime/anime`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(badDeleteAnime)
        });

        badDeleteAnime.name = "Katanagatari";
        failedResponse2 = await fetch(`http://localhost:3000/api/delete_user_anime/anime`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(badDeleteAnime)
        });
    })

    it('should respond with 200', async () => {
        assert.equal(response.status, 200);
    });

    it('should fail if it doesn\'t include id, name, or url', async () => {
        assert.equal(failedResponse.status, 500);
    });

    it('should fail if anime not in user database', async () => {
        assert.equal(failedResponse2.status, 500);
    });
});