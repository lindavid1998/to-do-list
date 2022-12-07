import { createDiv } from "./add-task.js"
import { getTasksOfActiveProject, getActiveProject, ProjectList } from "./ProjectClass.js";
import { format } from 'date-fns'
import { loadLocalStorage, saveToLocalStorage } from './index.js'
import { sortTasksByDueDate, sortTasksByName, sortTasksByPriority } from './sort-tasks.js'

export function updateScreen() {
   updateProjects()
   updateTasks()
}

export function updateProjects() {
    // clear DOM projects
    document.querySelectorAll('.project').forEach(
        project => project.remove()
    );

    loadLocalStorage() 

    // get list of projects
    let projects = ProjectList.projects

    // iterate through each project and append to DOM
    for (let i = 0; i < projects.length; i++) {
        let element = createProjectDiv(projects[i].name);
    
        document.querySelector('.projects').insertBefore(
            element, document.querySelector('.add-project')
        );
    }
}

function createProjectDiv(projectName) {
    let name = createDiv('title', projectName)
    
    let closeIcon = document.createElement('span')
    closeIcon.classList.add('material-icons', 'md-12', 'close')
    closeIcon.textContent = 'close'
    closeIcon.addEventListener('click', removeProject)

    let iconContainer = createDiv('delete-icon')
    iconContainer.appendChild(closeIcon)

    let element = createDiv('project')
    element.append(name, iconContainer)
    element.addEventListener('click', setActiveProject)
    
    return element
}

function setActiveProject(e) {
    if (!e.target.className.includes('close')) {
        getActiveProject().toggleActive()

        let next;
        if (e.target.className.includes('project')) {
            next = e.target.querySelector('.title').textContent
        } else {
            next = e.target.textContent
        }
        
        let index = ProjectList.projects.map(proj => proj.name).indexOf(next)
        ProjectList.projects[index].active = true

        saveToLocalStorage()
        
        updateTasks()
    }
}

function removeProject(e) {
    // read project name to remove
    let parent = e.target.parentNode.parentNode
    let projectName = parent.querySelector('.title').textContent

    // alert if attempt to delete inbox
    if (projectName == 'Inbox') {
        alert('Cannot delete Inbox')
        return
    }

    // remove project from project list
    ProjectList.remove(projectName)
    
    // set inbox as the active project
    let projects = ProjectList.projects
    let index = projects.map(proj => proj.name).indexOf('Inbox')
    projects[index].active = true

    // update local storage
    saveToLocalStorage()

    updateScreen()
}

export function updateTasks() {
    // clear DOM tasks
    document.querySelectorAll('.task').forEach(
        task => task.remove()
    );

    loadLocalStorage()

    // update project title on DOM
    let projectTitle = document.querySelector('.project-title');
    projectTitle.textContent = getActiveProject().name

    let tasks = getTasksOfActiveProject()

    // if task list is not empty
    if (tasks) {
        // iterate through task list 
        for (let i = 0; i < tasks.length; i++) {
            // if task is incomplete, append to DOM
            if (!tasks[i].isComplete) {
                document.querySelector('.incomplete').insertBefore(
                    createTaskDiv(tasks[i]),
                    document.querySelector('.add-task-minimized')
                );
            }
        }
    }
}

export function changeDueDateView() {
    let view = document.querySelector('.date.active-view')
    
    // toggle icon
    if (view.textContent == 'today') {
        view.textContent = 'hourglass_empty'
    } else {
        view.textContent = 'today'
    }

    // refresh tasks
    updateTasks()
}

function createTaskDiv(task) {
    let checkbox = createDiv('checkbox')
    let icon = createTaskRadioButton(task)
    checkbox.append(icon)

    let title = createDiv('title', task.title)
    let taskID = createDiv('task-id', task.id)

    let due = createDiv('due-date')
    let view = document.querySelector('.active-view').textContent
    
    if (task.dueDate == '') { // if no due date
        due.textContent = 'No due date'
    } else if (view == 'today') { // if date view
        due.textContent = `due ${format(task.dueDate, 'dd-MMM-yyyy')}`
    } else { // if time remaining view
        due.textContent = `due ${task.timeUntilDue}`
    }

    let del = createDiv('delete')
    let closeIcon = createTaskDeleteButton()
    del.append(closeIcon)
    del.addEventListener('click', removeTask)

    let element = createDiv('task')
    element.append(checkbox, title, taskID, due, del)

    return element
}

function createTaskRadioButton(task) {
    let element = document.createElement('span')
    element.classList.add('material-icons', 'task-radio-icon', task.priority)
    element.textContent = 'radio_button_unchecked'
    element.addEventListener('click', completeTask)

    return element
}

function createTaskDeleteButton() {
    let element = document.createElement('span')
    element.classList.add('material-icons', 'md-18', 'task-delete-icon')
    element.textContent = 'close'

    return element
}

function removeTask(e) {
    let taskID = getTaskID(e)
    getActiveProject().removeTask(taskID)

    // update local storage
    saveToLocalStorage()

    updateTasks()
}

function completeTask(e) {
    let taskID = getTaskID(e)

    let index = getActiveProject().tasks.map(task => task.id).indexOf(taskID)
    getActiveProject().tasks[index].toggleComplete()

    // update local storage
    saveToLocalStorage()

    updateTasks()
}

function getTaskID(e) {
    let parent = e.target.parentNode.parentNode
    return Number(parent.querySelector('.task-id').textContent)
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

export function changeSortOrder(e) {
    // update DOM
    let order = document.querySelector('.order')
    if (order.textContent == 'keyboard_double_arrow_down') {
        order.textContent = 'keyboard_double_arrow_up'
    } else {
        order.textContent = 'keyboard_double_arrow_down'
    }

    sortTasks()
}