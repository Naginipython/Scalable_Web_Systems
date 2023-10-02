import { test } from 'node:test';
import assert from 'node:assert'

test("Does the DELETE request work?", async () => {
    const response = await fetch("http://localhost:3000/api/books/1", {
        method: 'DELETE',
    });
    assert.equal(response.status, 200);

    const body = await response.text();
    const json = JSON.parse(body);

    const theBook = json.find(x => x.id == 1);
    assert.equal(theBook, undefined);
});