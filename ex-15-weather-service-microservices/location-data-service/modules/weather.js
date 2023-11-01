export async function getWeather(name) {
    let apiKey = "6be169f62d1e7f7972ce73fd3f36cbd4";
    let response = await fetch(`
        http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${apiKey}
    `);
    const data = await response.json();
    return data;
}