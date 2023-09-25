// A place to start adding routes.
import express from 'express';

const router = express.Router();

router.get('/hello', (req, res) => {
    res.json({ message: 'hello world' });
});

router.post('/cocktail', async (req, res) => {
    // https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
    var drink = req.body['cocktail-search'];
    let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`);
    // console.log(response);
    let data = await response.json();

    // Create array to send
    let arr = data['drinks'] == null? null : data['drinks'].reduce((rec, x) => {
        rec.push(x['strDrink']);
        return rec;
    }, []);

    res.json({ "drinks": arr })
});

export default router;