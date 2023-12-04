<script>
    import PostItem from './PostItem.svelte';
    export let date = "";
    export let day = [];
</script>

<div class="w-full pl-3 pr-3 border border-black my-1 rounded-md">
    <p>{date}</p>
    <div class="flex justify-center">
        <hr class="border-black w-full">
    </div>
    {#each day as d}
        <PostItem date={date} id={d.id} entry={d.entry} time={d.time} tags={d.tags} />
    {/each}
</div>