import { test } from 'node:test';
import assert from 'node:assert'

test("Does the POST request work?", async () => {
    const newBook = { "id": 3, "title": "Book3", "author": "Author3", "genre": "genre", "price": "3", "quantity": 5 };
    const response = await fetch("http://localhost:3000/api/books", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
    });
    assert.equal(response.status, 200);

    const body = await response.text();
    const json = JSON.parse(body);
    assert.equal(json.length, 2);

    const theBook = json.find(x => x.id == 3);
    assert.notEqual(theBook, undefined);
});