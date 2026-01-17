// declaring the 'tasks' array
let tasks = []

// grabbing the needed elements, some by ID, and others by tag name an dthen storing them into separate variables for future manipulation
let btnEl = document.querySelector("button")
let btnElTwo = document.getElementById("search-btn")
let taskListEl = document.getElementById("taskList")
let inputEl = document.getElementsByClassName("input")
let taskListElTwo = document.getElementById("searchdisplay")


// LS-1: loading tasks from local storage into array, if available
let savedTasks = localStorage.getItem("tasks") // 1)gets 'tasks' items from local storage
if (savedTasks) {
    tasks = JSON.parse(savedTasks); // 2) de-stringifies extracted data from Local Storage and stores in 'tasks' array
    renderTask(); // 3) calls function 'renderTask()' to render 'tasks' items stored in array
}

// adding an event listener to the 'btnEl' element for 'Add task' button functionality
btnEl.addEventListener("click", addNewtask)

// creating function 'addNewtask' that when called by the 'btnEl' button
// - takes 4 parameters whose arguments are used to make up the object 'newTask'
// - stores the assignement due date, converts it into an arithmetic value, and then compares that value to today's date (also as an arithmetic value)
// - so that if condition 'assignmentDate < Date.now())' is true, it assigns the string value "overdue" to the 'newTask' key:value 'status'
// - then pushes the entire 'newTask' object (with the updated key value) to the 'tasks' array
// - then it stringifies and saves items from the 'tasks' array to Local Storage
// - then finally calls renderTask() function to display these changes onto the page
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
        //console.log(newTask.status)
    }

    tasks.push(newTask)
    //console.log(newTask)

    // LS-1A: stringifies and pushes items from array to Local Storage
    localStorage.setItem("tasks", JSON.stringify(tasks)) // When "Add task" button is clicked, this saves the new task to Local Storage
    /* SCRATCHPAD:
    localStorage.setItem("tasks", JSON.stringify(tasks) )
    console.log(localStorage.getItem("tasks"))
    //localStorage.clear()  
    let tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"))
     console.log(tasksFromLocalStorage) 
    */
    renderTask()
    return newTask
}

// creating function 'checkOverDueTasks' that when invoked:
// - it loops through the tasks array's existing items
// -- fetches the assignment's due date of each array item
// -- converts it into an arithmetic value and store it into variable 'assignmentDateTwo'
// -- and then compares that value to today's date (also as an arithmetic value)
// - so that if condition 'assignmentDateTwo < Date.now())' is true, it assigns the string value "overdue" to the 'status' key of the current 'tasks' array item
// - then it stringifies and saves the object items from 'tasks' array to Local Storage
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

// adding an event listener to the 'btnElTwo' element for 'Search' button functionality
btnElTwo.addEventListener("click", searchBy)
/* SCRATCHPAD:
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

//creating a function 'renderTask()' that;
//-  loops through the tasks array's existing items
//-- creates a virtual empty list item (empty element) on the webpage for each 'tasks' item and stores them in the list item element 'liEl'
//-- inserts each of the 'tasks' current items into that virtual empty list item (empty element) on the webpage, efectively rendering them.
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
        // creating a selection box 'selectEl' that when option is changed, it calls an internal function 'updateStatus()'
        let selectEl = document.createElement("select");
        // declaring and initializing array 'statuses'
        let statuses = ["inprogress", "completed", "overdue"]

        statuses.forEach(status => {                        // for each an every 'status' in 'statuses' array....
            let option = document.createElement("option");  // create an 'option' html element on-the-fly
            option.value = status;  //then insert the 'status' value into the 'option' element
            //option.textContent = status.charAt(0).toUpperCase() + status.slice(1); // Capitalizes each status option while ensuring that all 3 options actually populate in the option menu itself 
            option.textContent = status; //ensures that all 3 options actually populate in the option menu itself 
            if (tasks[i].status === status) option.selected = true; //if the option in 'tasks' array equals the option selected by user..
            selectEl.appendChild(option);   //...then display the option selected
        })

        selectEl.addEventListener("change", function () {  //adding an event listener to the selection box 'selectEl' that when option is 'changed' it calls an internal function 'updateStatus'
            updateStatus(i, this.value);   //<---changes the status to the want desired
        });

        function updateStatus(i, newStatus) {
            tasks[i].status = newStatus;
            //console.log(tasks)
            // Save updated tasks to local storage
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTask();
        }
        //inserts the selected options of the 'selectEl' element variable into the 'liEl' element of EACH list item on the webpage.
        liEl.appendChild(selectEl);
        //then inserts those list items into the unordered list 'taskListEl', resulting in the rendering the results onto the webpage
        taskListEl.appendChild(liEl);
    }
}

/*
//////////////////////////// Scratchpad //////////////////////////////
#
console.log(Date.now())

const friendlyDate = new Date(Date.now()).toLocaleDateString();
console.log(friendlyDate);

console.log(new Date());
console.log(new Date(Date.now()));
console.log(new Date(Date.now()).toLocaleDateString());

console.log(date.getTime())
const deadlineTimestamp = new Date(task.deadline).getTime();

#
console.log(addNewtask("Module 1", "Lab 1", "10-10-26", "completed"))

///////////////////////////
*/
