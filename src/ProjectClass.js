export const ProjectList = (() => {
    var output = {}

    output.projects = []

    output.add = function(project) {
        output.projects.push(project)
    }

    output.remove = function(name) {
        output.projects = output.projects.filter(
            project => project.name != name
        );
    }

    return output

})();

export class Project {
    constructor(name, tasks = [], active = false) {
        this.name = name;
        this.tasks = tasks; //array of Task objects
        this.active = active;
    }

    addTask(task) {
        // task is of type Task
        this.tasks.push(task);
    }
    
    removeTask(ID) {
        this.tasks = this.tasks.filter(task => task.id != ID);
    }

    toggleActive() {
        this.active = !this.active
    }
}

export function getActiveProject() {
    let projects = ProjectList.projects
    return projects.find(proj => proj.active)
}