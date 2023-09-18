// routes.js
import express from 'express';
import { getWeather } from "../Modules/weather.js";

const router = express.Router();

router.get('/myweather/:lat/:long', async (req, res) => {
    let { lat, long } = req.params;
    let data = await getWeather(lat, long);
    res.json(data);
})

export default router;