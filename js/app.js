//problem: user interaction doesn't provide desired results
//solution: add interactivity so the user can manage daily tasks

var taskInput = document.getElementById('new-task'); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTaskHolder = document.getElementById('incomplete-tasks'); //<ul id="incomplete-tasks">
var completeTaskHolder = document.getElementById('completed-tasks'); //<ul id="completed-tasks">

//new task list item
var createNewTaskElement = function(taskString){
  //create list item
  var listItem = document.createElement("li");
  //input (checkbox)
  var checkBox = document.createElement("input"); //type = check box
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input"); //type = text
  //button.edit
  var editButton = document.createElement("button"); //class = edit
  //button.delete
  var deleteButton = document.createElement("button"); //class = delete
  
  //each element, needs to be modifying
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString;
  
  //each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

//add a new task
var addTask = function() {
  console.log("Add task...");
  //create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  //append item to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  
  taskInput.value = "";
};

//edit an existing task
var editTask = function(){
  console.log("Edit task...");
  var editButton = this.parentNode.querySelector("button.edit");
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode")
  //if the class of the parent is .editMode
  if(containsClass) {
    //switch from .editMode
    //label text becomes input value
    label.innerText = editInput.value;
    //switch text on button to save
    editButton.innerText = "Edit";
  } else {
    //switch to .editMode
    //input value becomes label's text
    editInput.value = label.innerText;
    //switch text on button to edit
    editButton.innerText = "Save";
  }

    //toggle .editMode on the list item
    listItem.classList.toggle("editMode");
}
//delete an existing task
var deleteTask = function(){
  console.log("Delete task...");
    //remove parent list item from the <ul>
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    ul.removeChild(listItem);
};

//mark a task as complete
var taskCompleted = function(){
  console.log("Mark task as complete...");
    //append the task <li> to the #completed-tasks <ul>
    var listItem = this.parentNode;
    completeTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

//mark a task as incomplete
var taskIncomplete = function(){
  console.log("Mark task as incomplete...");
    //append the task <li> to the #incompleted-tasks <ul>
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function (taskListItem, checkBoxEventHandler){
  console.log("Bind list item events");
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  //bind editTask to edit button
  editButton.onclick = editTask;
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
};

//set the click handler to the addTask()
addButton.onclick = addTask;

//cycle over incompleteTaskHolder ul list items
for(var i = 0; i < incompleteTaskHolder.children.length; i++){
    //bind events to list item'children (taskCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}
//cycle over completeTaskHolder ul list items
for(var i = 0; i < completeTaskHolder.children.length; i++){
    //bind events to list item'children (taskCompleted)
    bindTaskEvents(completeTaskHolder.children[i], taskIncomplete);
}
