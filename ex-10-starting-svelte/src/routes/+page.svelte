<script>
    let title = "Ben's hw & test TO-DO list";
    let unfinished_num = 3;
    let tasks = [
        {
            id: "text1",
            name: "Japanese wb69-70",
            isChecked: true
        },
        {
            id: "text2",
            name: "OS P3",
            isChecked: false
        },
        {
            id: "text3",
            name: "Web ex-10",
            isChecked: true
        },
        {
            id: "text4",
            name: "Japanese Speaking Test",
            isChecked: false
        },
        {
            id: "text5",
            name: "Japanese Kanji Quiz",
            isChecked: false
        },
    ];
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
</script>

<div id="main">
    <h1>{title}</h1>

    <br>
    
    <input type="checkbox" id="item1" checked={tasks[0].isChecked} on:click={() => {toggleTask(tasks, 0)}}>
    <label style="text-decoration:line-through" id={tasks[0].id} for="item1">{tasks[0].name}</label><br>

    <input type="checkbox" id="item2" checked={tasks[1].isChecked} on:click={() => {toggleTask(tasks, 1)}}>
    <label id={tasks[1].id} for="item2">{tasks[1].name}</label><br>

    <input type="checkbox" id="item3" checked={tasks[2].isChecked} on:click={() => {toggleTask(tasks, 2)}}>
    <label style="text-decoration:line-through" id={tasks[2].id} for="item3">{tasks[2].name}</label><br>

    <input type="checkbox" id="item4" checked={tasks[3].isChecked} on:click={() => {toggleTask(tasks, 3)}}>
    <label id={tasks[3].id} for="item4">{tasks[3].name}</label><br>

    <input type="checkbox" id="item5" checked={tasks[4].isChecked} on:click={() => {toggleTask(tasks, 4)}}>
    <label id={tasks[4].id} for="item5">{tasks[4].name}</label><br>
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
    input {
        width: 20px;
        height: 20px;
    }
</style>