<script>
    import store from './store.js';
    let city = 'N/A';
    let lat = 'N/A';
    let long = 'N/A';
    let temp = 'N/A';
    let humidity = 'N/A';

    store.subscribe(obj => {
        if (Object.keys(obj).length != 0) {
            city = obj.city == ''? "N/A" : obj.city;
            lat = obj.lat;
            long = obj.long;
            temp = obj.temp;
            humidity = obj.humidity;
        }
        return obj;
    })
</script>
<p>
    City Name: {city}
</p>
<p>
    Latitude: {lat}
</p>
<p>
    Longitude: {long}
</p>
<p>
    Temperature: {temp}
</p>
<p>
    Humidity: {humidity}
</p>