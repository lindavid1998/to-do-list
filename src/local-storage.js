import Task from "./TaskClass";
import { Project, ProjectList } from "./ProjectClass";

export function loadLocalStorage() {
  // reads localStorage and writes to ProjectList.projects

  // clear ProjectList.projects
  ProjectList.projects = [];

  // parse JSON string
  const projects = JSON.parse(localStorage.projects);

  // for each project
  for (let i = 0; i < projects.length; i++) {
    // get project tasks as raw object
    const rawTasks = projects[i].tasks;
    const constructedTasks = [];

    // for each task in project
    for (let j = 0; j < rawTasks.length; j++) {
      // construct Task object
      const task = new Task(
        rawTasks[j]._title,
        rawTasks[j]._dueDate,
        rawTasks[j]._priority,
        rawTasks[j].isComplete,
        rawTasks[j].id
      );

      // save to tasks array
      constructedTasks.push(task);
    }

    // construct Project object
    const project = new Project(
      projects[i].name,
      constructedTasks,
      projects[i].active
    );

    // save to ProjectList.projects
    ProjectList.add(project);
  }
}

export function saveToLocalStorage() {
  localStorage.projects = JSON.stringify(ProjectList.projects);
}
