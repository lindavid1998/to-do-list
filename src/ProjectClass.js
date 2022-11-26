const ProjectList = (() => {
    let projects = [];

    const add = (project) => {
        projects.push(project);
    }

    const remove = (projectName) => {
        projects = projects.filter(project => project.name != projectName);
    }

    return {
        add,
        remove,
        projects
    }

})();

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = []; //array of objects
        this.active = false;
    }

    addTask(task) {
        // task is instance of class Task
        this.tasks.push(task);
    }

    removeTask(taskName) {
        // taskName is string
        this.tasks = this.tasks.filter(task => task.title != taskName);
    }

    toggleActive() {
        this.active = !this.active
    }
}

function getActiveProject() {
    let projects = ProjectList.projects
    return projects.find(proj => proj.active)
}

export {
    ProjectList,
    Project,
    getActiveProject
}