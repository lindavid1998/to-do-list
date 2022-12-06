import { saveToLocalStorage } from "./index.js";
import { getTasksOfActiveProject } from "./ProjectClass.js";
import { updateTasks } from "./display.js"

function sortTasksByName(tasks, order) {
    // sorts Task array by Task.title
    // input: array of Task objects, order: 1 -> asc, -1 -> desc
    // output: none

    tasks.sort((a, b) => {
        return order * a.title.localeCompare(b.title)
    })
}

function sortTasksByPriority(tasks, order) {
    // sorts Task array by Task.priority
    // input: array of Task objects, order: 1 -> asc, -1 -> desc
    // output: none

    tasks.sort((a, b) => {
        return order * b.priority.localeCompare(a.priority)
    })
}

function sortTasksByDueDate(tasks, order) {
    // sorts Task  array by Task.dueDate, empty dates will be sorted to the end
    // input: array of Task objects, order: 1 -> asc, -1 -> desc
    // output: none

    tasks.sort((a, b) => {
        // if a has no due date but b does, sort after b
        if (!a.dueDate && b.dueDate) {
            return 1
        // if b has no due date but a does, sort after a
        } else if (!b.dueDate && a.dueDate) {
            return -1
        // if neither have due date, keep order
        } else if (!a.dueDate && !b.dueDate) {
            return 0
        } else if (a.dueDate.getTime() > b.dueDate.getTime()) {
            return order * 1
        } else if (a.dueDate.getTime() < b.dueDate.getTime()) {
            return order * -1
        } 
        return 0
    })
}

export function sortTasks() {
    // read dropdown
    let sortBy = document.querySelector('#sort').value
    if (sortBy == 'none') return

    // read order
    let order;
    let element = document.querySelector('.order');
    if (element.textContent == 'keyboard_double_arrow_up') {
        order = 1; // ascending
    } else {
        order = -1; // descending
    }

    // get task list of active project
    let tasks = getTasksOfActiveProject()

    // sort tasks based on input
    switch (sortBy) {
        case 'date':
            sortTasksByDueDate(tasks, order)
            break;
        case 'priority':
            sortTasksByPriority(tasks, order)
            break;
        case 'name':
            sortTasksByName(tasks, order)
            break;
    }

    // update local storage with sorted task list 
    saveToLocalStorage()

    // update screen
    updateTasks()
}

export function changeOrder(e) {
    // update DOM
    let order = document.querySelector('.order')
    if (order.textContent == 'keyboard_double_arrow_down') {
        order.textContent = 'keyboard_double_arrow_up'
    } else {
        order.textContent = 'keyboard_double_arrow_down'
    }

    sortTasks()
}
