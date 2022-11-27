let taskCounter = 0;

export class Task {
    constructor(title, dueDate) {
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