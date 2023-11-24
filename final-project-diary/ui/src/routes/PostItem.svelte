<script>
    export let id = -1;
    export let entry = "";
    export let time = "";
    export let tags = [];
</script>

<!-- TODO: Make this look cooler -->
<div id={id} class="w-full ps-3 border border-black my-1 rounded-md">
    <p>{time}: {entry}</p>
    <span>
        {#each tags as t}
        <!-- TODO: Make this look cooler -->
        <!-- TODO: Make an update tags feature -->
            <span>{t}, </span> 
        {/each}
    </span>
</div>