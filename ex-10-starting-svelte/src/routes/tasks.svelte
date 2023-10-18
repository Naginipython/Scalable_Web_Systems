<script>
    import Task from './task.svelte';
    import store from './store.js';
    let tasks = [];
    function addToTasks() {
        let task = document.getElementById('addToTasks').value;
        let obj = {
            name: task,
            isChecked: false
        };
        store.update(x => {
            x.addItems(obj);
            return x;
        });
    }

    store.subscribe(x => {
        tasks = x;
        console.log(x.getCheckedNum());
        return x;
    });
</script>

<input id="addToTasks" type="text"> <button on:click={addToTasks}>Add to tasks</button>
<hr>

{#each tasks.getItems() as item, i (item.id)}
    <Task {item} {i} />
{/each}