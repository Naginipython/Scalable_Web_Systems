import fs from 'fs';

async function getSecret() {
    return await fs.promises.readFile('secret.txt', 'utf8')
        .catch((err) => console.error('Failed to read file', err));
}

export async function getWeather(lat, long) {
    let apiKey = await getSecret();
    let response = await fetch(`
        https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}
    `);
    const data = await response.json();
    return data;
}