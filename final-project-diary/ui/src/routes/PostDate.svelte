<script>
    import PostItem from './PostItem.svelte';
    export let date = "";
    export let day = {};
</script>

<div class="w-full ps-3 border border-black my-1 rounded-md">
    <p>{date}</p>
    {#each Object.entries(day) as [_, d]}
        <PostItem id={d.id} entry={d.entry} time={d.time} tags={d.tags} />
    {/each}
</div>