const ProjectList = (() => {
  const output = {};

  output.projects = [];

  output.add = function addProject(project) {
    output.projects.push(project);
  };

  output.remove = function removeProject(name) {
    output.projects = output.projects.filter(
      (project) => project.name !== name
    );
  };

  return output;
})();

class Project {
  constructor(name, tasks = [], active = false) {
    this.name = name;
    this.tasks = tasks; // array of Task objects
    this.active = active;
  }

  addTask(task) {
    // task is of type Task
    this.tasks.push(task);
  }

  removeTask(ID) {
    this.tasks = this.tasks.filter((task) => task.id !== ID);
  }

  toggleActive() {
    this.active = !this.active;
  }
}

function getActiveProject() {
  const { projects } = ProjectList;
  return projects.find((proj) => proj.active);
}

function getTasksOfActiveProject() {
  const activeProject = ProjectList.projects.find(
    (project) => project.name === getActiveProject().name
  );

  return activeProject.tasks;
}

export { Project, ProjectList, getActiveProject, getTasksOfActiveProject };
