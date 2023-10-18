<script>
    import TasksComp from './tasks.svelte';
    let title = "Ben's hw & test TO-DO list";
    import data from './data.json';
    import { Tasks } from './tasksStruct.js';
    import store from './store.js';
    let tasks = Tasks.create();
    let checkedNum = 0;
    let num = 0;

    store.set(Tasks.fromJson(data));
    store.subscribe(x => {
        tasks = x;
        checkedNum = x.getCheckedNum();
        num = x.getSize();
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