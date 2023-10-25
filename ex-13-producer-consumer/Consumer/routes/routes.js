import express from 'express';

const router = express.Router();

router.use('/air-quality', async (req, res) => {
    const request = await fetch("http://localhost:3000/air-quality");
    const data = await request.json();
    res.json(data);
});

router.use('/humidity', async (req, res) => {
    const request = await fetch("http://localhost:3000/humidity");
    const data = await request.json();
    res.json(data);
});

router.use('/wind', async (req, res) => {
    const request = await fetch("http://localhost:3000/wind");
    const data = await request.json();
    res.json(data);
});

router.use('/soil-moisture', async (req, res) => {
    const request = await fetch("http://localhost:3000/soil-moisture");
    const data = await request.json();
    res.json(data);
});

router.use('/solar-radiation', async (req, res) => {
    const request = await fetch("http://localhost:3000/solar-radiation");
    const data = await request.json();
    res.json(data);
});

router.use('/precipitation', async (req, res) => {
    const request = await fetch("http://localhost:3000/precipitation");
    const data = await request.json();
    res.json(data);
});

router.use('/uv-index', async (req, res) => {
    const request = await fetch("http://localhost:3000/uv-index");
    const data = await request.json();
    res.json(data);
});

router.use('/noise-pollution', async (req, res) => {
    const request = await fetch("http://localhost:3000/noise-pollution");
    const data = await request.json();
    res.json(data);
});

export default router;