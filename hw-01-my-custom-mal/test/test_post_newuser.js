import { describe, it, before } from 'node:test';
import assert from 'node:assert';

// node --test

describe("POST newuser operations", async () => {
    const newUser = { "username": "post_user", "password": "password" };
    const badUser = { "username": "badUser" };
    let response;
    let body;
    let failedResponse;
    let failedResponse2;

    before(async () => {
        response = await fetch("http://localhost:3000/api/newuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        body = await response.text();

        failedResponse = await fetch("http://localhost:3000/api/newuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        failedResponse2 = await fetch("http://localhost:3000/api/newuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(badUser)
        });
    })

    it('should respond with 200', async () => {
        assert.equal(response.status, 200);
    })
    
    it('should return a static phrase', async () => {
        assert.equal(body, "User has been created");
    });

    it('should fail if username exists', async () => {
        assert.equal(failedResponse.status, 500);
    });

    it('should fail if it doesn\'t contain all fields', async () => {
        assert.equal(failedResponse2.status, 500);
    });
});