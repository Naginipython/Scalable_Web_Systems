// random_quotes.js
import fs from 'fs';

//reads from file, adds to global quotes
async function quotesArray() {
    const data = await fs.promises.readFile('modules/quotes.json')
        .catch((err) => console.error('Failed to read file', err));
  
    return JSON.parse(data).quotes;
}

//random(): { quote: string, author: string }
async function random() {
    let quotes = await quotesArray();
    let randQ = Math.floor(Math.random() * quotes.length);
    // console.log(quotes[randQ])
    return quotes[randQ];
}

//randomN(n: number): [ { quote: string, author: string }, ..., n ]
async function randomN(n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(await random());
    }
    return arr;
}

//randomAuthor(author: string): [ { quote: string, author: string }* ]
async function randomAuthor(author) {
    let quotes = await quotesArray();

    //returns a filtered array where quotes author == author parmeter
    return quotes.filter(x => x.author == author);
}

//randomMatch(match: string): [ { quote: string, author: string }* ]
async function randomMatch(match) {
    let quotes = await quotesArray();

    //returns a filtered array where quotes.quote must include substring match
    return quotes.filter(x => x.quote.includes(match));
}

export { random, randomN, randomAuthor, randomMatch }