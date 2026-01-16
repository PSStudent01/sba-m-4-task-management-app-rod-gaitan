
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


    let assignmentDate = new Date(newTask.deadline + "T23:59:59").getTime();
    if (assignmentDate < Date.now()) {
        newTask.status = "overdue"
        console.log(newTask.status)
    }

    tasks.push(newTask)
    console.log(newTask)
    renderTask()
    return newTask

}

//  console.log(addNewtask("Module 1", "Lab 1", "10-10-26", "completed"))

function checkOverDueTasks() {
    //let assignmentDateTwo  = new Date(newTask.deadline + "T23:59:59").getTime();
    //let assignmentDateTwo  = new Date(tasks[2] + "T23:59:59").getTime();
    for (let i = 0; i < tasks.length; i++) {
        let assignmentDateTwo = new Date(tasks[i].deadline + "T23:59:59").getTime()
        //console.log(assignmentDateTwo)
        //if(tasks[i].deadline < Date.now()){ }
        if (assignmentDateTwo < Date.now()) {
            //checkOverDueTasks.status = "overdue"
            tasks[i].status = "overdue"
            //console.log(checkOverDueTasks.status)
        }

    }

}


function renderTask() {

    checkOverDueTasks()
    //inputEl.value = ""  go back to this as it is not clearing my fields once I click the button!!!!!!
    taskListEl.innerHTML = "" //clears the list so it can be re-rendered without duplicating items


    for (let i = 0; i < tasks.length; i++) {
        let liEl = document.createElement("li")
        /*liEl.textContent = tasks[i]*/

        /*    
        liEl.textContent =                         // come back to create spaces in between rendered item objects!!!!
            `Category: ${tasks[i].category};<br>             
            Task name: ${tasks[i].task};<br>
            Deadline: ${tasks[i].deadline};<br>
            Status: ${tasks[i].status};<br>`

        taskListEl.appendChild(liEl)
        */

        liEl.innerHTML =
            `<strong>Category</strong>: ${tasks[i].category}<br>             
            <strong>Task name</strong>: ${tasks[i].task}<br>
            <strong>Deadline</strong>: ${tasks[i].deadline}<br>
            <strong>Status</strong>: ${tasks[i].status}<br>
        `

        let selectEl = document.createElement("select");



        let statuses = ["inprogress", "completed", "overdue"]

        statuses.forEach(status => {                        // for each an every 'status' in 'statuses' array....
            let option = document.createElement("option");  // create an 'option' html element on-the-fly
            option.value = status;  //then insert the 'status' value into the 'option' element
            //option.textContent = status.charAt(0).toUpperCase() + status.slice(1); // Capitalizes each status option while ensuring that all 3 options actually populate in the option menu itself 
            option.textContent = status; //ensures that all 3 options actually populate in the option menu itself 
            if (tasks[i].status === status) option.selected = true; //if the option in 'tasks' array equals the option selected by user..
            selectEl.appendChild(option);   //...then display the option selected
        })


        selectEl.addEventListener("change", function () {  //adding an event listener to the selection box 'selectEl' that when option is 'changed' it calls an internal function() 'updateStatus'
            updateStatus(i, this.value);   //...changes the status to the want desired
        });


        function updateStatus(index, newStatus) {
            tasks[index].status = newStatus;
            console.log(tasks); // <-- updates 'tasks' array.
            renderTask();
        }


        liEl.appendChild(selectEl);
        taskListEl.appendChild(liEl);

    }


}

        /*

        //////////////////////////// Scratchpad //////////////////////////////

        console.log(Date.now())

        const friendlyDate = new Date(Date.now()).toLocaleDateString();
        console.log(friendlyDate);

        console.log(new Date());
        console.log(new Date(Date.now()));
        console.log(new Date(Date.now()).toLocaleDateString());

        console.log(date.getTime())
        const deadlineTimestamp = new Date(task.deadline).getTime();

        ///////////////////////////
        */
