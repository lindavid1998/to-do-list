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
            this._dueDate = '';
        } else {
            // get date input in UTC
            let utcDate = new Date(value);

            // convert to local time
            let localDate = utcDate.getTime() + utcDate.getTimezoneOffset() * 60000;

            this._dueDate = new Date(localDate);
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