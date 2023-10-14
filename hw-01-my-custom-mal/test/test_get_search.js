import { test } from 'node:test';
import assert from 'node:assert';

test("Does the GET search request work?", async () => {
    const response = await fetch("http://localhost:3000/api/anime/Akame ga Kill");
    const body = await response.text();

    assert.equal(response.status, 200);
    assert.notEqual(body, null);

    const data = JSON.parse(body);
    assert.equal(data[0].name, "Akame ga Kill!"); //Technical name include '!'
});