
let tasks = []

let btnEl = document.querySelector("button")
let taskListEl = document.getElementById("taskList")
let inputEl = document.getElementsByClassName("input")


btnEl.addEventListener("click", addNewtask)

function addNewtask(category, task, deadline, status) {

let newTask = {
category: document.getElementById("category").value,
task: document.getElementById("taskname").value,
deadline: document.getElementById("deadline").value,
status: document.getElementById("status").value
}

tasks.push(newTask)

console.log(newTask)

renderTask()

return newTask

}

//  console.log(addNewtask("Module 1", "Lab 1", "10-10-26", "completed"))


function renderTask(){
    inputEl.value = ""  // go back to this as it is not clearing my fields once I click the button!!!!!!
    taskListEl.innerHTML = "" //clears the list so it can be re-rendered without duplicating items


    for (i=0; i < tasks.length; i++ ){
        let liEl = document.createElement("li")
        /*liEl.textContent = tasks[i]*/
        liEl.textContent =
            /*
            `tasks[i].category
            tasks[i].task
            tasks[i].deadline
            tasks[i].status`
            */                                  // come back to create spaces in between rendered item objects!!!!
            `Category: ${tasks[i].category};  
            Task name: ${tasks[i].task};
            Deadline: ${tasks[i].deadline};
            Status: ${tasks[i].status}`

        taskListEl.appendChild(liEl)
    }

}