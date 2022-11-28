let taskCounter = 0;

export class Task {
    constructor(title, dueDate, priority) {
        this.title = title;
        this.dueDate = dueDate;
        this.id = taskCounter++;
        this.isComplete = false;
        this.priority = priority;
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

    get priority() {
        return this._priority
    }

    set priority(value) {
        this._priority = value;
    }

    toggleComplete() {
        this.isComplete = !this.isComplete
    }
} 