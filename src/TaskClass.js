import { formatDistance } from 'date-fns'

let counter = 0;

export class Task {
    constructor(title, date, isComplete = false, priority, id = counter++) {
        this.title = title;
        this.dueDate = date;
        this.id = id;
        this.isComplete = isComplete;
        this.priority = priority;
    }

    get dueDate() {
        return this._dueDate
    }

    set dueDate(value) {
        if (value == '') {
            this._dueDate = value
        } else {
            this._dueDate = new Date(value)
        }
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

    get timeUntilDue() {
        let today = new Date();
        return formatDistance(this.dueDate, today, { addSuffix: true });
    }
} 