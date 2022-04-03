const listOfTasks = document.querySelector("#listOfTasks");

toDoScore.textContent = listOfTasks.children.length;

const toggleDone = (doneIcon) => {
  if (!doneIcon.style.color) {
    doneIcon.style.color = "green";
    doneScore.textContent++;
    toDoScore.textContent--;
    doneIcon.parentNode.classList.toggle("doneTask");
  } else {
    doneIcon.style.color = "";
    doneScore.textContent--;
    toDoScore.textContent++;
    doneIcon.parentNode.classList.toggle("doneTask");
  }
};

const createElement = (
  elementType,
  classes = [],
  textContent = "",
  appendElements = []
) => {
  const newElement = document.createElement(elementType);
  newElement.textContent = textContent;
  for (let i of classes) {
    newElement.classList.add(i);
  }
  for (let i of appendElements) {
    newElement.append(i);
  }

  return newElement;
};

const taskFormButton = document.querySelector("#taskFormButton");
taskFormButton.addEventListener("click", (event) => {
  event.preventDefault();
  addTask(task.value, assignee.value);
  task.value = "";
  assignee.value = "";
});

const buildAddTaskBlock = (newTask, newAssignee) => {
  const taskSpan = createElement("span", ["taskText"], newTask);
  const assigneeSpan = createElement("span", [], newAssignee);
  const taskDiv = createElement("div", [], "", ["Task: ", taskSpan]);
  const assigneeDiv = createElement("div", [], "", [
    "Assignee: ",
    assigneeSpan,
  ]);
  const deleteIcon = createElement("i", [
    "fa-solid",
    "fa-trash",
    "fa-xl",
    "trash",
  ]);
  const doneIcon = createElement("i", [
    "fa-solid",
    "fa-circle-check",
    "fa-xl",
    "done",
  ]);
  const li = createElement("li", ["element"], "", [
    taskDiv,
    assigneeDiv,
    deleteIcon,
    doneIcon,
  ]);

  listOfTasks.append(li);
  toDoScore.textContent++;
  localStorage.setItem(newTask, newAssignee);
};

const addTask = (newTask, newAssignee) => {
  if (newTask === "" || newAssignee === "") {
    alert("the inputs are empty");
    return;
  }
  buildAddTaskBlock(newTask, newAssignee);
};

listOfTasks.addEventListener("click", (event) => {
  event.target.classList.contains("trash") &&
    confirmDeletion(event.target.parentElement);
  event.target.classList.contains("done") && toggleDone(event.target);
});

const buildConfirmDeletionBlock = () => {
  const confirmaitionParagraph = createElement(
    "p",
    [],
    "Are you sure Delete This Task"
  );

  const deleteButton = createElement("button", [], "Delete");
  const cancelButton = createElement("button", [], "CANCEL");

  const buttonsDiv = createElement("div", ["buttonsDiv"], "", [
    cancelButton,
    deleteButton,
  ]);
  const confirmaitionDiv = createElement("div", ["confirmaition"], "", [
    confirmaitionParagraph,
    buttonsDiv,
  ]);
  listOfTasks.append(confirmaitionDiv);
  return [deleteButton, cancelButton, confirmaitionDiv];
};

const confirmDeletion = (clickedTask) => {
  if (listOfTasks.getElementsByClassName("confirmaition").length >= 1) {
    return;
  }
  [deleteButton, cancelButton, confirmaitionDiv] = buildConfirmDeletionBlock();
  deleteButton.addEventListener("click", () => {
    clickedTask.remove();
    confirmaitionDiv.remove();
    if (clickedTask.classList.contains("doneTask")) {
      toggleDone(clickedTask.querySelector(".done"));
    }
    toDoScore.textContent--;
    localStorage.removeItem(clickedTask.querySelector("span").textContent);
  });
  cancelButton.addEventListener("click", () => {
    confirmaitionDiv.remove();
  });
};

searchBar.addEventListener("input", () => {
  for (i of listOfTasks.querySelectorAll(".taskText")) {
    const parentLi = i.parentNode.closest("li");
    if (
      i.textContent.toUpperCase().indexOf(searchBar.value.toUpperCase()) > -1
    ) {
      parentLi.style.display = "";
    } else {
      parentLi.style.display = "none";
    }
  }
});

for (let i = 0; i < localStorage.length; i++) {
  addTask(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
}
