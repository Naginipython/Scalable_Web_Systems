<script>
    import TasksComp from './tasks.svelte';
    import { onMount } from 'svelte';
    let title = "Ben's hw & test TO-DO list";
    import { Tasks } from './tasksStruct.js';
    import store from './store.js';
    let tasks = Tasks.create();
    let checkedNum = 0;
    let num = 0;

    onMount(async () => {
        const response = await fetch(`http://localhost:4000/task_counter/list`);
        const json = await response.json();
        store.set(Tasks.fromJson(json));
    })

    store.subscribe(async x => {
        tasks = x;
        num = x.getSize();

        const response = await fetch(`http://localhost:4000/task_counter/count`);
        const json = await response.json();
        checkedNum = json.completed;
        return x;
    });
</script>

<div id="main">
    <h1>{title}</h1>

    <br>

    <TasksComp />

    <br>

    <h3>
        {checkedNum}/{num}
    </h3>
</div>

<style>
    #main {
        margin: auto;
        width: fit-content;
    }
    h1 {
        margin: auto;
        width: fit-content;
    }
    h3 {
        width: fit-content;
        margin: auto;
    }
</style>