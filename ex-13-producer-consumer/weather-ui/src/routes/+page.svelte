<script>
    import * as getWeather from './get_data.js';
    $: aqi = -1;
    $: humidity = -1;
    $: windSpeed = -1;
    $: windDirection = -1;
    $: soilMoisture = -1;
    $: solarRadiation = -1;
    $: precipitation = -1;
    $: uvIndex = -1;
    $: noisePollution = -1;

    async function getData() {
        aqi = await getWeather.getAqi();

        humidity = await getWeather.getHumidity();

        windSpeed = await getWeather.getWindSpeed();
        windDirection = await getWeather.getWindDirection();

        soilMoisture = await getWeather.getSoilMoisture();
        
        solarRadiation = await getWeather.getSolarRadiation();
        
        precipitation = await getWeather.getPrecipitation();
        
        uvIndex = await getWeather.getUvIndex();
        
        noisePollution = await getWeather.getNoisePollution();
    }
    getData();
</script>

<div>
    <button on:click={getData}>Get Latest Data</button>
</div>

<div>
    <h4>Air Quality Index:</h4>
    <p>
        {aqi}
    </p>
    <h4>Humidity:</h4>
    <p>
        {humidity}
    </p>
    <h4>Wind Speed:</h4>
    <p>
        {windSpeed} m/s
    </p>
    <h4>Wind Direction:</h4>
    <p>
        {windDirection} degrees
    </p>
    <h4>Soil Moisture:</h4>
    <p>
        {soilMoisture}%
    </p>
    <h4>Solar Radiation:</h4>
    <p>
        {solarRadiation} W/m^2
    </p>
    <h4>Precipitation:</h4>
    <p>
        {precipitation}mm
    </p>
    <h4>UV Index:</h4>
    <p>
        {uvIndex}
    </p>
    <h4>Noise Pollution:</h4>
    <p>
        {noisePollution} dB
    </p>
</div>

<style>
    button {
        width: fit-content;
        margin:auto;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    div {
        width:fit-content;
        margin:auto;
    }
    div h4 {
        margin: 5px;
        padding: 0px;
    }
    div p {
        margin: 0;
        padding: 0;
        text-align: center;
    }
</style>