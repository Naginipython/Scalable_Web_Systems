<script>
    import store from './store.js';

    let text = "";
    async function addEntry() {
        const response = await fetch(`http://localhost:3000/entry`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ entry: text }),
        });
        const updateResponse = await fetch("http://localhost:3003/content");
        const update = await updateResponse.json();

        // TODO: fix this (cant click post twice, and have it update)
        store.update(content => {
            content = update;
            return content;
        });
    }
</script>

<form class="w-full flex justify-center" contenteditable>
    <textarea class="w-1/2 grid grid-cols-2 textarea" placeholder="Write your entry here..." bind:value={text}></textarea>
    <button on:click={addEntry} class="grid grid-cols-2 w-1/9 btn">Post</button>
</form>

<style lang="postcss">
    .btn {
        @apply font-bold py-5 rounded-r bg-blue-500 text-white flex justify-center px-3;
    }
    .textarea {
        @apply block bg-white border border-slate-300 rounded-l py-2 ps-2 
        shadow-sm focus:outline-none placeholder:italic focus:border-sky-500 focus:ring-sky-500 focus:ring-1;
        resize: none;
    }
</style>