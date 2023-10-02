import { test } from 'node:test';
import assert from 'node:assert'

test("Does the PUT request work?", async () => {
    const data = {
        "title": "40 Clues"
    };
    const response = await fetch("http://localhost:3000/api/books/2", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    assert.equal(response.status, 200);

    const body = await response.text();
    assert.notEqual(body, null);

    const json = JSON.parse(body);
    const theBook = json.find(x => x.id == 2);
    assert.notEqual(theBook, undefined);
    assert.equal(theBook.quantity, 10);
});