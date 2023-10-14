import { describe, it, before } from 'node:test';
import assert from 'node:assert';

// node --test

describe("DELETE user operations", async () => {
    const newUser = { "username": "delete_user", "password": "password" };
    const newUser2 = { "username": "delete_user2", "password": "password" };
    const deleteUser = { 
        "username": "delete_user", 
        "password": "password",
        "acknowledgement": true
    };
    const badDeleteUser = { 
        "username": "delete_user2", 
        "password": "password"
    };
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
        let init_response2 = await fetch("http://localhost:3000/api/newuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser2)
        });

        response = await fetch("http://localhost:3000/api/delete_user", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleteUser)
        });

        // FAILS
        
        failedResponse = await fetch(`http://localhost:3000/api/delete_user`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(badDeleteUser)
        });

        badDeleteUser.acknowledgement = "false";
        failedResponse2 = await fetch(`http://localhost:3000/api/put_user2`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(badDeleteUser)
        });

        badDeleteUser.acknowledgement = false;
        failedResponse3 = await fetch(`http://localhost:3000/api/put_user2`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(badDeleteUser)
        });
    })

    it('should respond with 200', async () => {
        assert.equal(response.status, 200);
    });

    it('should fail if it doesn\'t include acknowledgement', async () => {
        assert.equal(failedResponse.status, 500);
    });

    it('should fail if acknowledgement isn\'t boolean', async () => {
        assert.equal(failedResponse2.status, 500);
    });

    it('should fail if acknowledgement is false', async () => {
        assert.equal(failedResponse3.status, 500);
    });
});