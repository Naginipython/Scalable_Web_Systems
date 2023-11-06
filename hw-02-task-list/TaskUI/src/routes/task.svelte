<script>
    import store from './store.js';
    export let item;
    async function deleteTask(id) {
        const response = await fetch(`http://localhost:4000/task_counter/remove`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        });
        store.update(x => {
            x.removeItem(id);
            return x;
        });
    }
    
    async function toggleTask(id) {
        const response = await fetch(`http://localhost:4000/task_counter/toggle`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, toggle: !item.isChecked })
        });
        store.update(x => {
            x.getById(id).isChecked = !x.getById(id).isChecked;
            return x;
        });
        if (item.isChecked) {
            document.getElementById(item.id).style.textDecoration = "line-through";
        } else {
            document.getElementById(item.id).style.textDecoration = "none";
        }
    }
</script>

<input class="checkbox" type="checkbox" id="item{item.id}" checked={item.isChecked} on:click={() => toggleTask(item.id)}>
{#if item.isChecked}
    <label style="text-decoration:line-through" id={item.id} for="item{item.id}">{item.name}</label>
{:else}
    <label id={item.id} for="item{item.id}">{item.name}</label>
{/if}
<button on:click={() => deleteTask(item.id)} class="deleteTask">X</button>
<br>


<style>
    label {
        font-size: x-large;
    }
    .checkbox {
        width: 20px;
        height: 20px;
    }
    .deleteTask {
        width: 20px;
        height: 20px;
        border: 1px solid black;
        float: right;
        position: relative;
        top: 8px;
    }
</style>