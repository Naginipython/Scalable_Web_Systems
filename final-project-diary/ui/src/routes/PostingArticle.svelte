<script>
    import { onMount } from 'svelte';
    import PostDate from './PostDate.svelte';
    import store from './store.js';
    let content = {};

    onMount(async () => {
        const response = await fetch(`http://localhost:3003/content`);
        const json = await response.json();
        store.set(json);
    });

    store.subscribe(_content => {
        content = _content;
    })
    
</script>

<div class="flex justify-center">
    <article class="w-2/3 grid grid-cols-1 justify-center">
        {#each Object.entries(content).reverse() as [_, date]}
            <PostDate date={date.date} day={date.day} />
        {/each}
    </article>
</div>