
let tasks = []

let btnEl = document.querySelector("button")
let btnElTwo = document.getElementById("search-btn")
let taskListEl = document.getElementById("taskList")
let inputEl = document.getElementsByClassName("input")   
let taskListElTwo = document.getElementById("searchdisplay")


// LS-1: Load tasks from local storage into array, if available
let savedTasks = localStorage.getItem("tasks") // 1)gets 'tasks' items from local storage
if (savedTasks) {
    tasks = JSON.parse(savedTasks); // 2) de-stringifies extracted data from Local Storage and stores in 'tasks' array
    renderTask(); // 3) calls function 'renderTask()' to render 'tasks' items stored in array
}



///////////////////////////////////////// local storage ////////////////////////
/*
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    renderLeads()
   
    // To verify that it works:
    //console.log( localStorage.getItem("myLeads") ) // 1) one way to verify and got confirmation that the array items are being extracted
    //let leadsFromLocalStorage = localStorage.getItem("myLeads") //2) another way is to store it in a variable and...
    //console.log(leadsFromLocalStorage) //3) the verify and get confirmation that the array items are being extracted by console.logging out the variable
   
    localStorage.clear()

    let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")) //4) a 3rd way to extract the data from local storage BUT HERE we converting back to non-string data.
    console.log(leadsFromLocalStorage) //5) the verify and get confirmation that the array items are being extracted by console.logging out the variable.
})
    */

//////////////////////////////////////////////////////////////////////////////////

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



    
    // LS-1A: stringifies and pushes items from array to Local Storage
    localStorage.setItem("tasks", JSON.stringify(tasks)) // When "Add task" button is clicked, this saves the new task to Local Storage

    /*
    localStorage.setItem("tasks", JSON.stringify(tasks) )
    console.log(localStorage.getItem("tasks"))
    //localStorage.clear()  
    let tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"))
     console.log(tasksFromLocalStorage) 
    */

     
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
    // LS-1B: stringifies and pushes items from array to Local Storage
    localStorage.setItem("tasks", JSON.stringify(tasks)); //when a task's status in 'tasks' becomes overdue, this saves the change in status Local Storage
}

btnElTwo.addEventListener("click", searchBy)
/*
function searchBy(){
    taskListElTwo.innerHTML = "" 
    for (let i = 0; i < tasks.length; i++) {
        if(tasks[i].status === "overdue" ){
            let liElTwo = document.createElement("li")
            liElTwo.innerHTML =
            `<strong>Category</strong>: ${tasks[i].category}<br>             
            <strong>Task name</strong>: ${tasks[i].task}<br>
            <strong>Deadline</strong>: ${tasks[i].deadline}<br>
            <strong>Status</strong>: ${tasks[i].status}<br>
            `
            taskListElTwo.appendChild(liElTwo)
        } else if(tasks[i].status === "complete" ){
            let liElTwo = document.createElement("li")
            liElTwo.innerHTML =
            `<strong>Category</strong>: ${tasks[i].category}<br>             
            <strong>Task name</strong>: ${tasks[i].task}<br>
            <strong>Deadline</strong>: ${tasks[i].deadline}<br>
            <strong>Status</strong>: ${tasks[i].status}<br>
            `
            taskListElTwo.appendChild(liElTwo)  
        }
            else if(tasks[i].status === "inprogress" ){
            let liElTwo = document.createElement("li")
            liElTwo.innerHTML =
            `<strong>Category</strong>: ${tasks[i].category}<br>             
            <strong>Task name</strong>: ${tasks[i].task}<br>
            <strong>Deadline</strong>: ${tasks[i].deadline}<br>
            <strong>Status</strong>: ${tasks[i].status}<br>
            `
            taskListElTwo.appendChild(liElTwo)  
    

        }
    }

}
*/

function searchBy() {
    const selectedStatus = document.getElementById("search").value

    taskListElTwo.innerHTML = ""

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].status === selectedStatus) {
            let liElTwo = document.createElement("li")
            liElTwo.innerHTML = `
                <strong>Category</strong>: ${tasks[i].category}<br>
                <strong>Task name</strong>: ${tasks[i].task}<br>
                <strong>Deadline</strong>: ${tasks[i].deadline}<br>
                <strong>Status</strong>: ${tasks[i].status}<br>
            `
            taskListElTwo.appendChild(liElTwo)
        }
    }
}


function renderTask() {

    checkOverDueTasks()
    //inputEl.value = "" //go back to this as it is not clearing my fields once I click the button!!!!!!
    taskListEl.innerHTML = "" //clears the list so it can be re-rendered without duplicating items


    for (let i = 0; i < tasks.length; i++) {
        let liEl = document.createElement("li")
        /*liEl.textContent = tasks[i]*/


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


        function updateStatus(i, newStatus) {
            tasks[i].status = newStatus;
            console.log(tasks)
            // Save updated tasks to local storage
            localStorage.setItem("tasks", JSON.stringify(tasks));
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
