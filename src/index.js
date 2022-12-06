import './style.css';
import { Project, ProjectList } from './ProjectClass.js'
import { Task } from './TaskClass'
import { showAddTask } from './add-task.js';
import { openAddProjectForm, closeAddProjectForm, addProjectClickHandler } from './add-project.js'
import { updateScreen, changeDueDateView } from './display.js';
import { changeOrder, sortTasks } from './sort-tasks.js';

export function loadLocalStorage() {
    // reads localStorage and writes to ProjectList.projects

    // clear ProjectList.projects
    ProjectList.projects = []

    // parse JSON string
    let projects = JSON.parse(localStorage['projects'])

    // for each project
    for (let i = 0; i < projects.length; i++) {
        // get project tasks as raw object
        let rawTasks = projects[i].tasks 
        // console.log(rawTasks)
        let constructedTasks = []

        // for each task in project
        for (let j = 0; j < rawTasks.length; j++) {
            // construct Task object
            let task = new Task(
                rawTasks[j]._title,
                rawTasks[j]._dueDate,
                rawTasks[j].isComplete,
                rawTasks[j]._priority,
                rawTasks[j].id
            )

            // save to tasks array
            constructedTasks.push(task)
        }

        // construct Project object
        let project = new Project(projects[i].name, constructedTasks, projects[i].active) 

        // save to ProjectList.projects
        ProjectList.add(project)

    }
}

export function saveToLocalStorage() {
    localStorage['projects'] = JSON.stringify(ProjectList.projects)
}

// initialize local storage
if (!localStorage['projects']) {
    let inbox = new Project('Inbox', [], true);
    ProjectList.add(inbox); 
    saveToLocalStorage()
} 

// initial loading
updateScreen()

// Add tasks click handler
document.querySelector('.add-task-minimized').addEventListener('click', showAddTask)

// Add projects click handlers
document.querySelector('.add-project').addEventListener('click', openAddProjectForm)
document.querySelector('.cancel-project-button').addEventListener('click', closeAddProjectForm)
document.querySelector('.add-project-button').addEventListener('click', addProjectClickHandler)

// View options
document.querySelector('.due-date-view').addEventListener('click', changeDueDateView)
document.querySelector('.order-view').addEventListener('click', changeOrder)
document.querySelector('#sort').addEventListener('change', sortTasks)