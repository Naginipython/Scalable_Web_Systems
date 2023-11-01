<script>
    import store from './store.js';
    let name = "";
    async function getWeather() {
        const response = await fetch(`http://localhost:3001/api/location-weather/${name}`);
        const body = await response.json();
        store.update(obj => {
            let data = {
                city: body.name,
                lat: body.coord.lat,
                long: body.coord.lon,
                temp: body.main.temp,
                humidity: body.main.humidity
            };
            obj = data
            return obj;
        });
    }
</script>

<label for="nameTxt">City/Country: </label>
<input bind:value={name} id="nameTxt"><br>

<button on:click={getWeather}>Get Weather</button>