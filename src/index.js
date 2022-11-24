import './style.css';

const ProjectList = (() => {
    let projects = [];

    const add = (project) => {
        projects.push(project);
    }

    const remove = (projectName) => {
        projects = projects.filter(project => project.name != projectName);
    }

    const getProjects = () => projects;

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
    }

    addTask(task) {
        // task is instance of class Task
        this.tasks.push(task);
    }

    removeTask(taskName) {
        // taskName is string
        this.tasks = this.tasks.filter(task => task.title != taskName);
    }
}

let taskCounter = 0;

class Task {
    constructor(title, dueDate = '') {
        this.title = title;
        this.dueDate = dueDate;
        this.id = taskCounter++;
        this.isComplete = false;
    }

    get dueDate() {
        return this._dueDate
    }

    set dueDate(value) {
        this._dueDate = value;
    }

    get title() {
        return this._title
    }

    set title(value) {
        this._title = value;
    }

    toggleComplete() {
        this.isComplete = !this.isComplete
    }
} 