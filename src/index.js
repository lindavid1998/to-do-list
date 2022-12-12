import "./style.css";
import showAddTask from "./add-task";
import { Project, ProjectList } from "./ProjectClass";
import { saveToLocalStorage } from "./local-storage";

import {
  openAddProjectForm,
  closeAddProjectForm,
  addProjectClickHandler,
} from "./add-project";

import {
  updateScreen,
  changeDueDateView,
  changeSortOrder,
  sortTasks,
  toggleCompletedTaskView,
} from "./display";

// initialize local storage
if (!localStorage.projects) {
  const inbox = new Project("Inbox", [], true);
  ProjectList.add(inbox);
  saveToLocalStorage();
}

// initial loading
updateScreen();

// Add tasks click handler
document
  .querySelector(".add-task-minimized")
  .addEventListener("click", showAddTask);

// Add projects click handlers
document
  .querySelector(".add-project")
  .addEventListener("click", openAddProjectForm);
document
  .querySelector(".button.cancel-project")
  .addEventListener("click", closeAddProjectForm);
document
  .querySelector(".button.add-project")
  .addEventListener("click", addProjectClickHandler);

// View options
document
  .querySelector(".due-date-view")
  .addEventListener("click", changeDueDateView);
document
  .querySelector(".order-view")
  .addEventListener("click", changeSortOrder);
document.querySelector("#sort").addEventListener("change", sortTasks);
document
  .querySelector(".view-completed-tasks")
  .addEventListener("click", toggleCompletedTaskView);

// Reset session
document.querySelector(".button.clear-all").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all tasks and projects?")) {
    localStorage.removeItem("projects");
    window.location.reload();
  }
});
