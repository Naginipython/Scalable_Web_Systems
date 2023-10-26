export async function getAqi() {
    const response = await fetch("http://localhost:4000/api/air-quality");
    const data = await response.json();
    return data['Air Quality Index'];
}

export async function getHumidity() {
    const response = await fetch("http://localhost:4000/api/humidity");
    const data = await response.json();
    return data['Humidity'];
}

export async function getWindSpeed() {
    const response = await fetch("http://localhost:4000/api/wind");
    const data = await response.json();
    return data['Wind Speed'];
}

export async function getWindDirection() {
    const response = await fetch("http://localhost:4000/api/wind");
    const data = await response.json();
    return data['Wind Direction'];
}

export async function getSoilMoisture() {
    const response = await fetch("http://localhost:4000/api/soil-moisture");
    const data = await response.json();
    return data['Soil Moisture'];
}

export async function getSolarRadiation() {
    const response = await fetch("http://localhost:4000/api/solar-radiation");
    const data = await response.json();
    return data['Solar Radiation'];
}

export async function getPrecipitation() {
    const response = await fetch("http://localhost:4000/api/precipitation");
    const data = await response.json();
    return data['Precipitation'];
}

export async function getUvIndex() {
    const response = await fetch("http://localhost:4000/api/uv-index");
    const data = await response.json();
    return data['UV Index'];
}

export async function getNoisePollution() {
    const response = await fetch("http://localhost:4000/api/noise-pollution");
    const data = await response.json();
    return data['Noise Pollution'];
}