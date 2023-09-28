// routes.js
import express from 'express';
import bookStore from '../books.json' assert { "type": "json" };

const router = express.Router();

router.get('/books', (req, res) => {
    res.send(bookStore);
});

router.get('/books/:id', (req, res) => {
    let { id } = req.params;
    let data = bookStore.find(x => x.id == id);
    res.send(data);
});

router.post('/books', (req, res) => {
    let json = req.body;

    //Checking if it includes all data
    if (
        json.hasOwnProperty('id') &&
        json.hasOwnProperty('title') &&
        json.hasOwnProperty('author') &&
        json.hasOwnProperty('genre') &&
        json.hasOwnProperty('price') &&
        json.hasOwnProperty('quantity')
    ) {
        // Checks if the parseInt makes numbers
        if (
            !isNaN(parseInt(json['id'])) &&
            !isNaN(parseInt(json['price'])) &&
            !isNaN(parseInt(json['quantity']))
        ) {
            //Finds if id is used
            if (bookStore.every(x => x.id != parseInt(json['id']))) {
                bookStore.push({
                    "id": parseInt(json['id']),
                    "title": json['title'],
                    "author": json['author'],
                    "genre": json['genre'],
                    "price": parseInt(json['price']),
                    "quantity": parseInt(json['quantity'])
                });
                res.send(bookStore);
            } else {
                res.send("ERROR: id already in use\nData was not posted");
            }
        } else {
            res.send("ERROR: id, price, and/or quantity is not a number\nData was not posted");
        }
    } else {
        res.send("ERROR: POST json doesn't include all fields\nData was not posted");
    }
});

router.put('/books/:id', (req, res) => {
    let json = req.body;
    let { id } = req.params;

    // Check if id is valid
    let book = bookStore.find(x => x.id == id);
    if (book != null) {
        // Checks each updatable property
        if (json.hasOwnProperty('title')) {
            book.title = json['title'];
        }
        if (json.hasOwnProperty('author')) {
            book.author = json['author'];
        }
        if (json.hasOwnProperty('genre')) {
            book.genre = json['genre'];
        }
        if (json.hasOwnProperty('price')) {
            if (!isNaN(parseInt(json['price']))) {
                book.price = parseInt(json['price']);
            } else {
                res.send("ERROR: price isn't a number");
            }
        }
        if (json.hasOwnProperty('quantity')) {
            if (!isNaN(parseInt(json['quantity']))) {
                book.quantity = parseInt(json['quantity']);
            } else {
                res.send("ERROR: quantity isn't a number");
            }
        }
        res.send(bookStore);
    } else {
        res.send("ERROR: id doesn't exist in database\nData was not updated");
    }
});

router.delete('/books/:id', (req, res) => {
    let { id } = req.params;
    let index = bookStore.findIndex(x => x.id == id);
    bookStore.splice(index, 1);
    res.send(bookStore);
});

export default router;