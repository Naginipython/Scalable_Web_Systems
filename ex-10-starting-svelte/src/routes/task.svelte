<script>
    import store from './store.js';
    export let item;
    export let i;
    function deleteTask(id) {
        store.update(x => {
            x.removeItem(id);
            return x;
        });
    }
    
    function toggleTask(index) {
        store.update(x => {
            x.getIndex(index).isChecked = !x.getIndex(index).isChecked;
            return x;
        });
        if (item.isChecked) {
            document.getElementById(item.id).style.textDecoration = "line-through";
        } else {
            document.getElementById(item.id).style.textDecoration = "none";
        }
    }
</script>

<input class="checkbox" type="checkbox" id="item{i}" checked={item.isChecked} on:click={() => toggleTask(i)}>
{#if item.isChecked}
    <label style="text-decoration:line-through" id={item.id} for="item{i}">{item.name}</label>
{:else}
    <label id={item.id} for="item{i}">{item.name}</label>
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