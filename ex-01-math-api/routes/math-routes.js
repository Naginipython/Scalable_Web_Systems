// routes/math-routes
import express from 'express';
import add from '../modules/math.js'
const router = express.Router();

router.get('/add/:a/:b', (req, res) => {
    const {a, b} = req.params;
    res.send(`${add(parseInt(a), parseInt(b))}`);
});

export default router;