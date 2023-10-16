<script>
    let title = "Ben's hw & test TO-DO list";
    let tasks = [
        {
            id: "text0",
            name: "Japanese wb69-70",
            isChecked: true
        },
        {
            id: "text1",
            name: "OS P3",
            isChecked: false
        },
        {
            id: "text2",
            name: "Web ex-10",
            isChecked: true
        },
        {
            id: "text3",
            name: "Japanese Speaking Test",
            isChecked: false
        },
        {
            id: "text4",
            name: "Japanese Kanji Quiz",
            isChecked: false
        },
    ];
    let taskNum = tasks.length;
    function toggleTask(arr, index) {
        console.log("swapped");
        arr[index].isChecked = !arr[index].isChecked;
        if (arr[index].isChecked) {
            document.getElementById(arr[index].id).style.textDecoration = "line-through";
        } else {
            document.getElementById(arr[index].id).style.textDecoration = "none";
        }
        tasks = arr;
    }
    function addToTasks() {
        let task = document.getElementById('addToTasks').value;
        let obj = {
            id: "text"+taskNum,
            name: task,
            isChecked: false
        };
        taskNum++;
        tasks.push(obj);
        tasks = tasks;
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        tasks = tasks;
    }

</script>

<div id="main">
    <h1>{title}</h1>

    <br>

    <input id="addToTasks" type="text"> <button on:click={addToTasks}>Add to tasks</button>
    <hr>

    {#each tasks as item, i}
        <input class="checkbox" type="checkbox" id="item{i}" checked={item.isChecked} on:click={() => toggleTask(tasks, i)}>
        {#if item.isChecked}
            <label style="text-decoration:line-through" id={item.id} for="item{i}">{item.name}</label>
        {:else}
            <label id={item.id} for="item{i}">{item.name}</label>
        {/if}
        <button on:click={() => deleteTask(i)} class="deleteTask">X</button>
        <br>
    {/each}

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