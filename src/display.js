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
    let projects = ProjectList.projects

    // iterate through each project and append to DOM
    for (let i = 0; i < projects.length; i++) {
        let element = createDiv('project', projects[i].name);
        element.addEventListener('click', setActiveProject)
        
        document.querySelector('.projects').insertBefore(
            element, document.querySelector('.add-project')
        );
    }
}

function setActiveProject(e) {
    getActiveProject().toggleActive()

    let next = e.target.textContent;
    let index = ProjectList.projects.map(proj => proj.name).indexOf(next)
    ProjectList.projects[index].active = true
    
    updateTasks()
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
    let project = ProjectList.projects.find(
        project => project.name == getActiveProject().name
    );

    // iterate through task list and append to DOM
    let tasks = project.tasks
    if (tasks) {
        for (let i = 0; i < tasks.length; i++) {
            document.querySelector('.incomplete').insertBefore(
                createTaskDiv(tasks[i]),
                document.querySelector('.add-task-minimized')
            );
        }
    }
}

function createTaskDiv(task) {
    let icon = document.createElement('span')
    icon.setAttribute('class', 'material-icons')
    icon.textContent = 'radio_button_unchecked'

    let checkbox = createDiv('checkbox')
    checkbox.append(icon)

    let title = createDiv('title', task.title)
    let due = createDiv('due-date', task.dueDate)

    let closeIcon = document.createElement('span')
    closeIcon.setAttribute('class', 'material-icons')
    closeIcon.textContent = 'close'

    let del = createDiv('delete')
    del.appendChild(closeIcon)

    let element = createDiv('task')
    element.appendChild(checkbox)
    element.appendChild(title)
    element.appendChild(due)
    element.appendChild(del)

    return element
}