import express from 'express';

const router = express.Router();

router.use('/air-quality', async (req, res) => {
    const request = await fetch("http://localhost:3000/air-quality");
    const data = await request.json();
    let html = `<p>Air Quality is ${data["Air Quality Index"]}</p>`;
    res.send(html);
});

router.use('/humidity', async (req, res) => {
    const request = await fetch("http://localhost:3000/humidity");
    const data = await request.json();
    let html = `<p>Humidity is ${data["Humidity"]}</p>`;
    res.send(html);
});

router.use('/wind', async (req, res) => {
    const request = await fetch("http://localhost:3000/wind");
    const data = await request.json();
    let html = `<p>Wind Speed is ${data["Wind Speed"]}mph</p><p>Wind Direction is ${data["Wind Direction"]}</p>`;
    res.send(html);
});

router.use('/soil-moisture', async (req, res) => {
    const request = await fetch("http://localhost:3000/soil-moisture");
    const data = await request.json();
    let html = `<p>Soil Moisture is ${data["Soil Moisture"]}%</p>`;
    res.send(html);
});

router.use('/solar-radiation', async (req, res) => {
    const request = await fetch("http://localhost:3000/solar-radiation");
    const data = await request.json();
    let html = `<p>Solar Radiation is ${data["Solar Radiation"]}W/m^2</p>`;
    res.send(html);
});

router.use('/precipitation', async (req, res) => {
    const request = await fetch("http://localhost:3000/precipitation");
    const data = await request.json();
    let html = `<p>Precipitation is ${data["Precipitation"]}mm</p>`;
    res.send(html);
});

router.use('/uv-index', async (req, res) => {
    const request = await fetch("http://localhost:3000/uv-index");
    const data = await request.json();
    let html = `<p>UV Index is ${data["UV Index"]}</p>`;
    res.send(html);
});

router.use('/noise-pollution', async (req, res) => {
    const request = await fetch("http://localhost:3000/noise-pollution");
    const data = await request.json();
    let html = `<p>Noise Pollution is ${data["Noise Pollution"]}dB</p>`;
    res.send(html);
});

export default router;