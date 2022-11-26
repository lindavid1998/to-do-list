export class Project {
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