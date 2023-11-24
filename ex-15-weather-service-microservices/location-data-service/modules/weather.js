import fs from 'fs';

async function getSecret() {
    return await fs.promises.readFile('secret.txt', 'utf8')
        .catch((err) => console.error('Failed to read file', err));
}

export async function getWeather(name) {
    let apiKey = await getSecret();
    let response = await fetch(`
        http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${apiKey}
    `);
    const data = await response.json();
    return data;
}