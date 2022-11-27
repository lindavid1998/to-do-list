import { createDiv } from "./add-task.js"
import { getActiveProject, ProjectList } from "./ProjectClass.js";

export function updateScreen() {
   updateProjects()
   updateTasks()
}

export function updateProjects() {
    // clear DOM projects
    document.querySelectorAll('.project').forEach(
        project => project.remove()
    );

    // get list of projects
    let projects = ProjectList.getProjects()

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
    closeIcon.classList.add('class', 'material-icons')
    closeIcon.classList.add('class', 'md-12')
    closeIcon.textContent = 'close'
    closeIcon.addEventListener('click', removeProject)

    let iconContainer = createDiv('delete-icon')
    iconContainer.appendChild(closeIcon)

    let element = createDiv('project')
    element.appendChild(name)
    element.appendChild(iconContainer)
    element.addEventListener('click', setActiveProject)
    
    return element
}

function setActiveProject(e) {
    if (e.target === this) {
        getActiveProject().toggleActive()
        let next = e.target.querySelector('.title').textContent
        
        let index = ProjectList.getProjects().map(proj => proj.name).indexOf(next)
        ProjectList.getProjects()[index].active = true
        
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
    let projects = ProjectList.getProjects()
    let index = projects.map(proj => proj.name).indexOf('Inbox')
    projects[index].active = true

    updateScreen()
}

export function updateTasks() {
    // clear DOM tasks
    document.querySelectorAll('.task').forEach(
        task => task.remove()
    );

    // update project title on DOM
    let projectTitle = document.querySelector('.project-title');
    projectTitle.textContent = getActiveProject().name

    // get task list of current project
    let project = ProjectList.getProjects().find(
        project => project.name == getActiveProject().name
    );

    // iterate through task list 
    let tasks = project.tasks
    if (tasks) {
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

function createTaskDiv(task) {
    let icon = document.createElement('span')
    icon.classList.add('material-icons')
    icon.classList.add('task-radio-icon')
    icon.textContent = 'radio_button_unchecked'
    icon.addEventListener('click', completeTask)

    let checkbox = createDiv('checkbox')
    checkbox.append(icon)

    let title = createDiv('title', task.title)
    let taskID = createDiv('task-id', task.id)
    let due = createDiv('due-date', task.dueDate)

    let closeIcon = document.createElement('span')
    closeIcon.classList.add('material-icons')
    closeIcon.classList.add('task-delete-icon')
    closeIcon.textContent = 'close'

    let del = createDiv('delete')
    del.appendChild(closeIcon)
    del.addEventListener('click', removeTask)

    let element = createDiv('task')
    element.appendChild(checkbox)
    element.appendChild(title)
    element.appendChild(taskID)
    element.appendChild(due)
    element.appendChild(del)

    return element
}

function removeTask(e) {
    // read task ID
    let taskID = getTaskID(e)

    // remove task from project 
    getActiveProject().removeTask(taskID)

    updateTasks()
}

function completeTask(e) {
    // read task ID
    let taskID = getTaskID(e)

    // access task inside active project
    let index = getActiveProject().tasks.map(task => task.id).indexOf(taskID)

    // set complete to true
    getActiveProject().tasks[index].toggleComplete()

    updateTasks()
}

function getTaskID(e) {
    let parent = e.target.parentNode.parentNode
    return Number(parent.querySelector('.task-id').textContent)
}