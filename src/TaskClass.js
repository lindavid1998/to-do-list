import { formatDistance } from 'date-fns'

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
        if (value == '') {
            this._dueDate = '';
        } else {
            // get date input in UTC
            let utcDate = new Date(value);

            // convert to local time
            this._dueDate = new Date(
                utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
            ); 
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