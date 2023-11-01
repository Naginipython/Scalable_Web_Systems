// routes.js
import express from 'express';
import { getWeather } from '../modules/weather.js';

const router = express.Router();

const locationData = {};

router.post('/locations', (req, res) => {
    let { name, lat, long } = req.body;
    if (lat == undefined || long == undefined || name == undefined) {
        res.status(400).send("Error: Did not contain name, lat, or long");
    }
    locationData[name] = {lat: lat, long: long};
    res.json(locationData[name]);
});

router.put('/locations/:name', (req, res) => {
    let { name } = req.params;
    let { lat, long } = req.body;
    if (!locationData.hasOwnProperty(name)) {
        res.status(400).send("Error: name not in data");
    }
    if (lat == undefined || long == undefined) {
        res.status(400).send("Error: Did not contain lat or long");
    }
    locationData[name] = {lat: lat, long: long};
    res.json(locationData[name]);
});

router.get('/location-weather/:name', async (req, res) => {
    let { name } = req.params;
    // if (!locationData.hasOwnProperty(name)) {
    //     res.status(400).send("Error: name not in data");
    // }
    const weather = (await getWeather(name))[0];
    const response = await fetch(`http://localhost:3000/api/myweather/${weather.lat}/${weather.lon}`);
    const data = await response.json();
    res.status(200).json(data);
});

export default router;