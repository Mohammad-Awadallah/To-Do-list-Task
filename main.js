




const listOfTasks = document.querySelector("#listOfTasks")

toDoScore.textContent = listOfTasks.children.length;


const calcDone = (doneIcon)=>{
 
    if(!doneIcon.style.color){
        doneIcon.style.color = "green";
        doneScore.textContent ++
        toDoScore.textContent --
        doneIcon.parentNode.classList.toggle("doneTask")
    }else{
        doneIcon.style.color = ""
        doneScore.textContent -- 
        toDoScore.textContent ++
        doneIcon.parentNode.classList.toggle("doneTask")
    }
    

}

const taskFormButton = document.querySelector("#taskFormButton");
taskFormButton.addEventListener("click", (event) => {
  event.preventDefault();
  addTask(task.value, assignee.value);
  task.value = "";
  assignee.value = "";
});

const addTask = (newTask, newAssignee) => {
  if(newTask === "" || newAssignee === ""){
    alert("the inputs are empty")
    return;
  }
  const taskDiv = document.createElement("div");
  const taskSpan = document.createElement("span");
  taskSpan.classList.add("taskText")
  taskSpan.textContent = newTask
  taskDiv.append("Task: ",taskSpan)
  const assigneeDiv = document.createElement("div");
  const assigneeSpan = document.createElement("span");
  assigneeDiv.append("Assignee: " ,assigneeSpan)
  assigneeSpan.textContent = newAssignee

  const li = document.createElement("li");
  const deleteIcon = document.createElement("i")
  deleteIcon.classList.add("fa-solid" , "fa-trash","fa-xl" , "trash");
  
  const doneIcon = document.createElement("i");
  doneIcon.classList.add("fa-solid","fa-circle-check","fa-xl" , "done");
  
  li.append(taskDiv,assigneeDiv,deleteIcon, doneIcon);
  li.classList.add("element")
  listOfTasks.append(li);
  toDoScore.textContent ++
  localStorage.setItem(newTask,newAssignee)
};

listOfTasks.addEventListener("click", (event) => {
  
  event.target.classList.contains("trash") &&confirmaition(event.target.parentElement);
  event.target.classList.contains("done") && calcDone(event.target);

});



const confirmaition = (clickedTask) => {
  if(listOfTasks.getElementsByClassName("confirmaition").length >= 1){
    return
  }
  const confirmaitionDiv = document.createElement("div");
  confirmaitionDiv.classList.add("confirmaition")
  const confirmaitionParagraph = document.createElement("p");
  confirmaitionParagraph.textContent = "Are you sure Delete This Task";
  const buttonsDiv = document.createElement("div")
  buttonsDiv.classList.add("buttonsDiv")
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "CANCEL";
  buttonsDiv.append( cancelButton,deleteButton)
  confirmaitionDiv.append(confirmaitionParagraph, buttonsDiv);
  
  listOfTasks.append(confirmaitionDiv);
  deleteButton.addEventListener("click", () => {
    clickedTask.remove();
    confirmaitionDiv.remove();
    if(clickedTask.classList.contains("doneTask")){
      calcDone(clickedTask.querySelector(".done"));
    }
    toDoScore.textContent --
    localStorage.removeItem(clickedTask.querySelector("span").textContent)
  });
  cancelButton.addEventListener("click", () => {
    confirmaitionDiv.remove();
  });
};

searchBar.addEventListener("input",()=>{
  
  for(i of listOfTasks.querySelectorAll(".taskText")){
    
    const parentLi = i.parentNode.closest('li')
     if(i.textContent.toUpperCase().indexOf(searchBar.value.toUpperCase())>-1){
       parentLi.style.display = ""
     }else{
       parentLi.style.display = "none"
     }
  }
})


for(let i =0;i < localStorage.length; i++){
  
  addTask(localStorage.key(i),localStorage.getItem(localStorage.key(i)))
}