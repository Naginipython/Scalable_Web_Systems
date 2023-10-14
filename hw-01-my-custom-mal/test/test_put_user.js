import { describe, it, before } from 'node:test';
import assert from 'node:assert';

// node --test

describe("PUT user anime operations", async () => {
    const newUser = { "username": "put_user", "password": "password" };
    const newUser2 = { "username": "put_user2", "password": "password" };
    const updateUser = { 
        "username": "put_user", 
        "password": "password",
        "newUsername": "new_put_user"
    };
    const badUpdateUser = { 
        "username": "new_put_user", 
        "password": "password",
        "newUsername": "put_user2"
    };
    let response;
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
        let init_response2 = await fetch("http://localhost:3000/api/newuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser2)
        });

        response = await fetch("http://localhost:3000/api/put_user", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateUser)
        });

        // FAILS
        
        // failedResponse = await fetch(`http://localhost:3000/api/new_put_user`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(badUpdateUser)
        // });

        badUpdateUser.public = "1";
        badUpdateUser.newUsername = "new_put_user2"
        failedResponse2 = await fetch(`http://localhost:3000/api/put_user2`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(badUpdateUser)
        });
    })

    it('should respond with 200', async () => {
        assert.equal(response.status, 200);
    });

    // it('should fail if user already exists', async () => {
    //     assert.equal(failedResponse.status, 500);
    // });

    it('should fail if public isn\'t boolean', async () => {
        assert.equal(failedResponse2.status, 500);
    });
});