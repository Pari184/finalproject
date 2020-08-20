import Task from "./task.js";
import TaskManager from "./taskmanager.js";

// Class for creating task
var checkValidName = false; //global variable
var checkValidDesc = false; //global variable
var checkValidAssignee = false;
var checkValidStatus = false;
var checkValidDate = false;


// Class for managing and accessing the task


/* code for card heading 
        <div class="card mb-3">
            <div class="card-header pl-0 pr-0">
                <div class="row no-gutters w-100 align-items-center">
                    <div class="col ml-3">Tasks</div>
                    <div class="col-4 text-muted">
                        <div class="row no-gutters align-items-center">
                            <div class="col">Edit/Delete</div>
                        </div>
                    </div>
                </div>
            </div>
*/

/*const taskContainer = document.querySelector(".addModal");

const createTask = document.querySelector("#addTask");
createTask.addEventListener("click", validation);

function validation(){
    const taskname = document.querySelector("#")
    //validation for all fields
}*/


const taskContainer = document.querySelector('#tasksummary');
const taskManager = new TaskManager(taskContainer, editTaskClicked, deleteTaskClicked);


//const editbtn;
//const taskContainer = document.querySelector('#tasks');

//const createButton = document.querySelector('.addTask');
//createButton.addEventListener("click", createTaskClicked);

const taskForm = document.querySelector('#task-form');
const taskIdInput = document.querySelector('#task-id');
//taskForm.addEventListener("addTask", taskFormSubmitted);

//const modalElement = document.querySelector('#addModal');


const addBtn = document.querySelector("#addTask");
const edttask = document.querySelector("#editTask");



addBtn.onclick = function() {
    const name = document.querySelector("#taskName");
    const description = document.querySelector("#textDescription");
    const assignee = document.querySelector("#assignedTo");
    const date = document.querySelector("#dueDate");
    const status = document.querySelector("#taskStatus");
    
    // const mode = "ADD";
    // validateFormElements(name,description,assignee,date,mode);
    // if (checkValidName && checkValidDesc && checkValidAssignee ) {
    //     //const taskContainer = document.querySelector('#tasksummary');
    //     addBtn.focus();
        taskManager.addTask(name.value, description.value, assignee.value, date.value, status.value);
        taskManager.display();
        //taskContainer.append(element);
        //const element = newta.toHTMLString();
        //taskContainer.innerHTML = "";
        //taskManager.addTaskToPage(task);
        //document.forms["#task-form"].reset();
        document.querySelector("#task-form").reset();
        //document.getElementsByClassName(".spanclass").hide();
        resetValidationMessages();
        $("#addModal").modal("hide");
//    } 
    // else {
    //     return false;
    // }
};

function validateFormElements(name,description,assignee,dueDate,mode){
    var errMsg1 = "";
    var errMsg2 = "";
    var errMsg3 = "";
    var errMsg4 = "";
    if(mode == "ADD"){
       errMsg1 =  "#errMsg1";
       errMsg2 = "#errMsg2";
       errMsg3 = "#errMsg3";
       errMsg4 = "#errMsg4";
    }
    else{
        errMsg1 =  "#errMsg6";
       errMsg2 = "#errMsg7";
       errMsg3 = "#errMsg8";
       errMsg4 = "#errMsg9";
    }
    if (name.value == "" || name.value.length < 8 ) {
        setErrorMessage("This field cannot be blank, must be 8 chars long and can be alpha numeric",errMsg1);
        name.style.borderColor = "red";
        name.focus();
        checkValidName=false;
    } else {
        setValidationSuccessMessage(errMsg1);
        name.style.border = "none";
        checkValidName = true;
    }
    if (description.value == "" || description.value.length < 15 ) {
        setErrorMessage("This field cannot be blank and must be 15 chars long",errMsg2);
        description.style.borderColor = "red";
        description.focus();
        checkValidDesc=false;
    }       else {
        setValidationSuccessMessage(errMsg2);
        description.style.border = "none";
        checkValidDesc=true;
    }
    if (assignee.value == "" || assignee.value.length < 8) {
        setErrorMessage("This field cannot be blank and must be 8 chars long",errMsg3);
        assignee.style.borderColor = "red";
        assignee.focus();
        checkValidAssignee = false;
    } else {
        setValidationSuccessMessage(errMsg3);
        assignee.style.border = "none";
        checkValidAssignee = true;
    }
    // var currentDate = new Date();
    // dueDateValue = new Date(dueDate.value);
    // if (dueDateValue.value == undefined || dueDateValue < currentDate){
    //     setErrorMessage("The date is lesser than current date",errMsg4);
    //     dueDate.style.borderColor = "red";
    //     dueDate.focus();
    //     checkValidDate = false;
    // }
    // else{
    //     setValidationSuccessMessage(errMsg4);
    //     dueDate.style.border = "none";
    //     checkValidDate = true;
    // }
        

}

function setErrorMessage(errorDesc,errorElement){
    const errMsg = document.querySelector(errorElement);
    errMsg.innerHTML = errorDesc;
    errMsg.style.color = "red";
    
}
function setValidationSuccessMessage(errorElement){
    const errMsg = document.querySelector(errorElement);
    errMsg.innerHTML = "Looks Good";
    errMsg.style.color = "green";
}

function resetValidationMessages(){
    $("#errMsg1").innerHTML = "";
    $("#errMsg2").innerHTML = "";
    $("#errMsg3").innerHTML = "";
    $("#errMsg4").innerHTML = "";
    $("#errMsg6").innerHTML = "";
    $("#errMsg7").innerHTML = "";
    $("#errMsg8").innerHTML = "";
    $("#errMsg9").innerHTML = "";
};

edttask.onclick = function() {
    const tid = document.getElementById("editTaskID");
    const tname = document.getElementById("editTaskName");
    const tdesc = document.getElementById("editTextDescription");
    const tassignee = document.getElementById("editAssignedTo");
    const tdate = document.getElementById("editDueDate");
    const tstatus = document.getElementById("editTaskStatus");
    const errMsg1 = document.querySelector("#errMsg6");
    const errMsg2 = document.querySelector("#errMsg7");
    const errMsg3 = document.querySelector("#errMsg8");
    const errMsg4 = document.querySelector("#errMsg9");
    const mode = "Edit";
    validateFormElements(tname,tdesc,tassignee,tdate,mode);


    //later call the validation function.
    if (checkValidName && checkValidDesc && checkValidAssignee && checkValidDate) {
        taskManager.updateTask(tid.value, tname.value, tdesc.value, tassignee.value, tdate.value, tstatus.selected);
        resetValidationMessages();
        $("#editModal").modal("hide");
    }
    else
        $("#editModal").focus();
    // else {
    //     return false;
    // }
    
}


function editTaskClicked(event) {
    var currentElement = $(this.parentElement).closest("#taskEdit")[0].getElementsByTagName("p");
    const taskID = currentElement[0].id;
    const taskName = currentElement[0].innerText;
    var contentsToSplit = currentElement[1].innerText.split('-');
    const taskDesc = contentsToSplit[0];
    const taskAssignee = contentsToSplit[1];
    const taskDate = contentsToSplit[2] + "-" + contentsToSplit[3] + "-" + contentsToSplit[4];
    const taskStatus = contentsToSplit[5];
    document.getElementById("editTaskID").value = taskID;
    document.getElementById("editTaskName").value = taskName;
    document.getElementById("editTextDescription").value = taskDesc;
    document.getElementById("editAssignedTo").value = taskAssignee;
    document.getElementById("editDueDate").value = taskDate;
    document.getElementById("editTaskStatus").selected = taskStatus;
    $("#editModal").modal("show");
    
}

function deleteTaskClicked(event) {
    //const taskElement = event.target.closest(".task");
    var currentElement = $(this.parentElement).closest("#taskEdit")[0].getElementsByTagName("p");
    const taskID = currentElement[0].id;
    taskManager.deleteTask(taskID);
    taskManager.display();
}


function addTaskToPage(task) {
    const element = task.toHtmlElement();
    taskContainer.append(element);
}