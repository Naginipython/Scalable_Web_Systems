<script>
    import GetWeather from './getWeather.svelte';
    import WeatherDisplay from './weatherDisplay.svelte';
    import MostRecentLocations from './mostRecentLocations.svelte';
    import store from './store.js';

    let recent = [];
    store.set({});
    store.subscribe(obj => {
        if (Object.keys(obj).length != 0) {
            if (recent.length < 5) {
                recent.push(obj);
            } else {
                console.log("here");
                recent.shift();
                recent.push(obj);
            }
            recent = recent;
        }
        return obj;
    });
</script>

<div class="centered">
    <GetWeather />
</div>
<div class="centered">
    <WeatherDisplay />
</div>

<br>

<h3 class="centered">Recent Locations</h3>
<div class="centered">
    {#each recent as item}
    <div class="recent">
        <MostRecentLocations data={item} />
    </div>
    {/each}
</div>

<style>
    .centered {
        width:fit-content;
        margin: auto;
    }
    .recent {
        float: left;
        padding: 10px;
    }
</style>