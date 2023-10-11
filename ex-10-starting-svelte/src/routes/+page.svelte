<script>
    let title = "Ben's hw & test TO-DO list";
    let unfinished_num = 3;
    let tasks = [
        {
            name: "Japanese wb69-70",
            isChecked: true
        },
        {
            name: "OS P3",
            isChecked: false
        },
        {
            name: "Web ex-10",
            isChecked: true
        },
        {
            name: "Japanese Speaking Test",
            isChecked: false
        },
        {
            name: "Japanese Kanji Quiz",
            isChecked: false
        },
    ];
</script>

<div id="main">
    <h1>{title}</h1>

    <br>

    <form>
        <input type="checkbox" id="item1" checked={tasks[0].isChecked}>
        <label for="item1">{tasks[0].name}</label><br>

        <input type="checkbox" id="item2" checked={tasks[1].isChecked}>
        <label for="item2">{tasks[1].name}</label><br>

        <input type="checkbox" id="item3" checked={tasks[2].isChecked}>
        <label for="item3">{tasks[2].name}</label><br>

        <input type="checkbox" id="item4" checked={tasks[3].isChecked}>
        <label for="item4">{tasks[3].name}</label><br>

        <input type="checkbox" id="item5" checked={tasks[4].isChecked}>
        <label for="item5">{tasks[4].name}</label><br>
        <!-- <input type="submit" value="Submit"> -->
    </form>
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