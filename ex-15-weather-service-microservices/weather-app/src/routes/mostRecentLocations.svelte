<script>
    import store from './store.js';
    export let data = {
        city: 'N/A',
        lat: 'N/A',
        long: 'N/A',
        temp: 'N/A',
        humidity: 'N/A'
    };
</script>
<p>
    City Name: {data.city}
</p>
<p>
    Latitude: {data.lat}
</p>
<p>
    Longitude: {data.long}
</p>
<p>
    Temperature: {data.temp}
</p>
<p>
    Humidity: {data.humidity}
</p>