import { format } from "date-fns";
import createDiv from "./create-div";
import {
  getTasksOfActiveProject,
  getActiveProject,
  ProjectList,
} from "./ProjectClass";
import { loadLocalStorage, saveToLocalStorage } from "./local-storage";
import {
  sortTasksByDueDate,
  sortTasksByName,
  sortTasksByPriority,
} from "./sort-tasks";

export function updateScreen() {
  updateProjects();
  updateTasks();
}

export function updateProjects() {
  // clear DOM projects
  document.querySelectorAll(".project").forEach((project) => project.remove());

  loadLocalStorage();

  // get list of projects
  const { projects } = ProjectList;

  // iterate through each project and append to DOM
  for (let i = 0; i < projects.length; i++) {
    const element = createProjectDiv(projects[i].name);

    document
      .querySelector(".projects")
      .insertBefore(element, document.querySelector(".add-project"));
  }
}

function createProjectDiv(projectName) {
  const name = createDiv("title", projectName);

  const closeIcon = document.createElement("span");
  closeIcon.classList.add("material-icons", "md-12", "close");
  closeIcon.textContent = "close";
  closeIcon.addEventListener("click", removeProject);

  const iconContainer = createDiv("delete-icon");
  iconContainer.appendChild(closeIcon);

  const element = createDiv("project");
  element.append(name, iconContainer);
  element.addEventListener("click", setActiveProject);

  return element;
}

function setActiveProject(e) {
  if (!e.target.className.includes("close")) {
    getActiveProject().toggleActive();

    let next;
    if (e.target.className.includes("project")) {
      next = e.target.querySelector(".title").textContent;
    } else {
      next = e.target.textContent;
    }

    const index = ProjectList.projects.map((proj) => proj.name).indexOf(next);
    ProjectList.projects[index].active = true;

    saveToLocalStorage();

    updateTasks();
  }
}

function removeProject(e) {
  // read project name to remove
  const parent = e.target.parentNode.parentNode;
  const projectName = parent.querySelector(".title").textContent;

  // alert if attempt to delete inbox
  if (projectName == "Inbox") {
    alert("Cannot delete Inbox");
    return;
  }

  // remove project from project list
  ProjectList.remove(projectName);

  // set inbox as the active project
  const { projects } = ProjectList;
  const index = projects.map((proj) => proj.name).indexOf("Inbox");
  projects[index].active = true;

  // update local storage
  saveToLocalStorage();

  updateScreen();
}

export function updateTasks() {
  // clear DOM tasks
  document.querySelectorAll(".task").forEach((task) => task.remove());

  loadLocalStorage();

  // update project title on DOM
  const projectTitle = document.querySelector(".project-title");
  projectTitle.textContent = getActiveProject().name;

  const tasks = getTasksOfActiveProject();

  // if task list is not empty
  if (tasks) {
    // iterate through task list
    for (let i = 0; i < tasks.length; i++) {
      if (!tasks[i].isComplete) {
        document
          .querySelector(".incomplete")
          .insertBefore(
            createTaskDiv(tasks[i]),
            document.querySelector(".add-task-minimized")
          );
      } else {
        document
          .querySelector(".completed")
          .appendChild(createTaskDiv(tasks[i]));
      }
    }
  }
}

export function changeDueDateView() {
  const view = document.querySelector(".date.active-view");

  // toggle icon
  if (view.textContent == "today") {
    view.textContent = "hourglass_empty";
  } else {
    view.textContent = "today";
  }

  // refresh tasks
  updateTasks();
}

function createTaskDiv(task) {
  const checkbox = createDiv("checkbox");
  const icon = createTaskRadioButton(task);
  checkbox.append(icon);

  const title = createDiv("title", task.title);
  const taskID = createDiv("task-id", task.id);

  const due = createDiv("due-date");
  const view = document.querySelector(".active-view").textContent;

  if (task.dueDate == "") {
    // if no due date
    due.textContent = "No due date";
  } else if (view == "today") {
    // if date view
    due.textContent = `due ${format(task.dueDate, "dd-MMM-yyyy")}`;
  } else {
    // if time remaining view
    due.textContent = `due ${task.timeUntilDue}`;
  }

  const del = createDiv("delete");
  const closeIcon = createTaskDeleteButton();
  del.append(closeIcon);
  del.addEventListener("click", removeTask);

  const element = createDiv("task");
  element.append(checkbox, title, taskID, due, del);

  return element;
}

function createTaskRadioButton(task) {
  const element = document.createElement("span");
  element.classList.add("material-icons", "task-radio-icon", task.priority);
  element.textContent = "radio_button_unchecked";
  element.addEventListener("click", completeTask);

  return element;
}

function createTaskDeleteButton() {
  const element = document.createElement("span");
  element.classList.add("material-icons", "md-18", "task-delete-icon");
  element.textContent = "close";

  return element;
}

function removeTask(e) {
  const taskID = getTaskID(e);
  getActiveProject().removeTask(taskID);

  // update local storage
  saveToLocalStorage();

  updateTasks();
}

function completeTask(e) {
  const taskID = getTaskID(e);

  const index = getTasksOfActiveProject()
    .map((task) => task.id)
    .indexOf(taskID);
  getTasksOfActiveProject()[index].toggleComplete();

  // update local storage
  saveToLocalStorage();

  updateTasks();
}

function getTaskID(e) {
  const parent = e.target.parentNode.parentNode;
  return Number(parent.querySelector(".task-id").textContent);
}

export function sortTasks() {
  // read dropdown
  const sortBy = document.querySelector("#sort").value;
  if (sortBy == "none") return;

  // read order
  let order;
  const element = document.querySelector(".order");
  if (element.textContent == "keyboard_double_arrow_up") {
    order = 1; // ascending
  } else {
    order = -1; // descending
  }

  // get task list of active project
  const tasks = getTasksOfActiveProject();

  // sort tasks based on input
  // eslint-disable-next-line default-case
  switch (sortBy) {
    case "date":
      sortTasksByDueDate(tasks, order);
      break;
    case "priority":
      sortTasksByPriority(tasks, order);
      break;
    case "name":
      sortTasksByName(tasks, order);
      break;
  }

  // update local storage with sorted task list
  saveToLocalStorage();

  // update screen
  updateTasks();
}

export function changeSortOrder() {
  // update DOM
  const order = document.querySelector(".order");
  if (order.textContent == "keyboard_double_arrow_down") {
    order.textContent = "keyboard_double_arrow_up";
  } else {
    order.textContent = "keyboard_double_arrow_down";
  }

  sortTasks();
}

export function toggleCompletedTaskView() {
  const button = document.querySelector(".view-completed-tasks .view-label");
  const completed = document.querySelector(".completed");

  if (button.textContent == "Show Completed") {
    completed.style.display = "block";
    button.textContent = "Hide Completed";
  } else {
    completed.style.display = "none";
    button.textContent = "Show Completed";
  }
}
