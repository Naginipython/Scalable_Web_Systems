<script>
    import store from './store.js';
    export let date = "";
    export let id = -1;
    export let entry = "";
    export let time = "";
    export let tags = [];

    async function add_tag() {
        let tag = prompt("Please enter a tag handle:");
        if (tag != null && tag != "") {
            const response = await fetch(`http://localhost:3002/create_tag/${tag}`, {
                method: 'POST'
            });
            const response2 = await fetch(`http://localhost:3002/tag/${id}/${tag}`, {
                method: 'POST'
            });
            const new_tag = await response2.json();
            store.update(content => {
                let update = content[date]['day'].find(x => x.id == id);
                update.tags.unshift(new_tag);
                return content;
            });
        }
    }
</script>

<div id={id} class="post w-full p-2 my-1 rounded-md overflow-auto bg-gray-100 rounded-md">
    <p class="pb-2">
        {time}: <br />
        &emsp;{entry} <br />
    </p>
    {#each tags as t}
        <!-- TODO optional: Fix scroll overflow -->
        <span class="border-2 {t.c} rounded-md p-0.5 mr-1">{t.t}</span> 
    {/each}
    <button class="add_tags border-2 border-black bg-slate-300 rounded-md pl-0.5 pr-0.5 mr-1" on:click={add_tag}>+tag</button>
</div>

<style lang="postcss">
    .red {
        @apply border-red-500 bg-red-300;
    }
    .orange {
        @apply border-orange-500 bg-orange-300;
    }
    .yellow {
        @apply border-yellow-500 bg-yellow-300;
    }
    .green {
        @apply border-green-500 bg-green-300;
    }
    .blue {
        @apply border-blue-500 bg-blue-300;
    }
    .purple {
        @apply border-purple-500 bg-purple-300;
    }
    /* @media (hover: hover) {
        .add_tags {
            display: none;
        }
        .post:hover .add_tags {
            display: inline-block;
            width: fit-content;
        } 
    } */
</style>