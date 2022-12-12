import { Project, ProjectList } from "./ProjectClass";
import { updateProjects } from "./display";
import { saveToLocalStorage } from "./local-storage";

function openAddProjectForm() {
  document.querySelector(".add-project-form").style.display = "block";
}

function closeAddProjectForm() {
  document.querySelector(".add-project-form").style.display = "none";
}

function addProjectClickHandler() {
  // get user input
  const name = document.querySelector("#name").value;

  // alert if input is empty
  if (name == "") {
    alert("Project name cannot be empty");
    return;
  }

  // alert if project name is already taken
  const { projects } = ProjectList;
  if (projects.find((project) => project.name === name)) {
    alert("Project name already taken");
    return;
  }

  // add to project list
  ProjectList.add(new Project(name));

  // save to local storage
  saveToLocalStorage();

  // reset and close form
  document.querySelector("#name").value = "";
  closeAddProjectForm();

  // update project list
  updateProjects();
}

export { openAddProjectForm, closeAddProjectForm, addProjectClickHandler };
