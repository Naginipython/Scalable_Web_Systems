//Started this with `npm init -y es6`, then ran `npm install -S express`.
import express from 'express';
const router = express.Router();

router.get('/products', (req, res) => {
    res.send('Behold the vast array of treasures that await!');
  });
  
  router.post('/products', (req, res) => {
    res.send('Submit your offerings, and we shall bestow them upon the kingdom!');
  });

export default router;