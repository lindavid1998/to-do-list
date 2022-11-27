const ProjectList = (() => {
    let projects = [];

    const add = (project) => {
        projects.push(project);
    }

    const remove = (projectName) => {
        projects = projects.filter(project => project.name != projectName);
    }

    const getProjects = () => projects

    return {
        add,
        remove,
        getProjects
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
    
    removeTask(ID) {
        this.tasks = this.tasks.filter(task => task.id != ID);
    }

    toggleActive() {
        this.active = !this.active
    }
}

function getActiveProject() {
    let projects = ProjectList.getProjects()
    return projects.find(proj => proj.active)
}

export {
    ProjectList,
    Project,
    getActiveProject
}