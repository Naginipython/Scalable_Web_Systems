// weather.js

export async function getWeather(lat, long) {
    let apiKey = "6be169f62d1e7f7972ce73fd3f36cbd4";
    let response = await fetch(`
        https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}
    `);
    const data = await response.json();
    return data;
}