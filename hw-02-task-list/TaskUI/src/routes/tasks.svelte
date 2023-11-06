<script>
    import Task from './task.svelte';
    import store from './store.js';
    let tasks = [];
    async function addToTasks() {
        const task = document.getElementById('addToTasks').value;
        const response = await fetch(`http://localhost:4000/task_counter/add`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: task })
        });
        const json = await response.json();

        let obj = {
            id: json.id,
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
        return x;
    });
</script>

<input id="addToTasks" type="text"> <button on:click={addToTasks}>Add to tasks</button>
<hr>

{#each tasks.getItems() as item}
    <Task {item}/>
{/each}