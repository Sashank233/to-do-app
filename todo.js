let tasks = [];
let id = 1;
let taskname = document.querySelector("#taskname");
let taskList = document.querySelector("#taskList");

taskname.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        let obj = {};
        obj.title = taskname.value;
        obj.status = 'Pending';
        obj.id = id;
        id++;
        tasks.push(obj);
        setLocalStorage();
        addDom(obj);
        taskname.value = '';
    }
});

function addDom(task) {
    let taskdiv = document.createElement("div");
    taskdiv.className = "task-item";
    taskdiv.setAttribute("id", task.id);

    let span = document.createElement("span");
    span.innerText = task.title;

    let chk = document.createElement("input");
    chk.setAttribute("type", "checkbox");
    chk.addEventListener("click", function () {
        let status = chk.checked ? "Completed" : "Pending";
        span.style.textDecoration = chk.checked ? "line-through" : "none";

        tasks = tasks.map(function (item) {
            if (item.id == task.id) {
                item.status = status;
            }
            return item;
        });

        setLocalStorage();
        console.log(tasks);
    });

    let editbtn = document.createElement("button");
    editbtn.innerText = "Edit";
    editbtn.addEventListener("click", function () {
        let tasktitle = prompt("Enter the new task name", task.title);
        if (tasktitle !== null && tasktitle.trim() !== "") {
            task.title = tasktitle;
            tasks = tasks.map(function (item) {
                if (item.id == task.id) {
                    item.title = tasktitle;
                }
                return item;
            });
            setLocalStorage();
            console.log(tasks);
            span.innerText = tasktitle;
        }
    });

    let delbtn = document.createElement("button");
    delbtn.className = "delete";
    delbtn.innerText = "Del";
    delbtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this task?")) {
            delHandler(task.id);
        }
    });

    taskdiv.append(span);
    taskdiv.append(chk);
    taskdiv.append(delbtn);
    taskdiv.append(editbtn);
    taskList.append(taskdiv);
}

function delHandler(id) {
    let taskdiv = document.getElementById(id);
    if (taskdiv) {
        taskdiv.style.animation = 'removeTask 0.5s forwards';
        setTimeout(() => {
            taskdiv.remove();
            tasks = tasks.filter(function (item) {
                return item.id != id;
            });
            setLocalStorage();
        }, 500);
    }
}

document.getElementById("clearAll").addEventListener("click", function () {
    if (confirm("Are you sure you want to clear all tasks?")) {
        clearAllTasks();
    }
});

function clearAllTasks() {
    taskList.innerHTML = '';
    tasks = [];
    setLocalStorage();
}

function setLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getLocalStorage() {
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    } else {
        tasks = [];
    }
    tasks.forEach(element => {
        addDom(element);
    });
    console.log(tasks);
}

getLocalStorage();
