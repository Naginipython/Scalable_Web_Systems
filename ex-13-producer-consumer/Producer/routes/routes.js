import express from 'express';

const router = express.Router();

let aqi = 0; // Values between 0 and 300
let humidity = 0; // Values between 0.00 and 100.00
let windSpeed = 0; // Values between 0.00 and 30.00
let windDirection = 0; // Values between 0 and 359
let soilMoisture = 0; // Values between 0.00 and 100.00
let solarRadiation = 0; // Values between 0.00 and 1000.00
let precipitation = 0; // Values between 0.00 and 100.00
let uvIndex = 0; // Values between 0 and 11
let noisePollution = 0; // Values between 0.00 and 100.00
setInterval(() => {
    aqi = Math.floor(Math.random() * 301);
    humidity = (Math.random() * 100).toFixed(2);
    windSpeed = (Math.random() * 30).toFixed(2);
    windDirection = Math.floor(Math.random() * 360);
    soilMoisture = (Math.random() * 100).toFixed(2);
    solarRadiation = (Math.random() * 1000).toFixed(2);
    precipitation = (Math.random() * 100).toFixed(2);
    uvIndex = Math.floor(Math.random() * 12);
    noisePollution = (Math.random() * 100).toFixed(2)
}, 5000);

router.use('/air-quality', (req, res) => {
    // Air Quality Index (AQI)
    res.json({
        "Air Quality Index": aqi
    });
});

router.use('/humidity', (req, res) => {
    // Humidity
    res.json({
        "Humidity": humidity
    });
});

router.use('/wind', (req, res) => {
    // Wind Speed (m/s)
    res.json({
        "Wind Speed": windSpeed,
        "Wind Direction": windDirection
    });
});

router.use('/soil-moisture', (req, res) => {
    // Soil Moisture (%)
    res.json({
        "Soil Moisture": soilMoisture
    });
});

router.use('/solar-radiation', (req, res) => {
    // Solar Radiation (W/m^2)
    res.json({
        "Solar Radiation": solarRadiation
    });
});

router.use('/precipitation', (req, res) => {
    // Precipitation (mm)
    res.json({
        "Precipitation": precipitation
    });
});

router.use('/uv-index', (req, res) => {
    // UV Index
    res.json({
        "UV Index": uvIndex
    });
});

router.use('/noise-pollution', (req, res) => {
    // Noise Pollution (dB)
    res.json({
        "Noise Pollution": noisePollution
    });
});

export default router;