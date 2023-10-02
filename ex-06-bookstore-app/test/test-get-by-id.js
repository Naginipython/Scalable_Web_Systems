import { test } from 'node:test';
import assert from 'node:assert'

test("Does the GET request by id work?", async () => {
    const response = await fetch("http://localhost:3000/api/books/2");
    const body = await response.text();
    const json = JSON.parse(body);

    assert.equal(response.status, 200);
    assert.equal(json.title, "39 Clues");
});