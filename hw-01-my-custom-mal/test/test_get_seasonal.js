import { test } from 'node:test';
import assert from 'node:assert';

test("Does the GET seasonal request work?", async () => {
    const response = await fetch("http://localhost:3000/api/anime/seasonal");
    const body = await response.text();

    assert.equal(response.status, 200);
    assert.notEqual(body, null);
});