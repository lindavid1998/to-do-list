import './style.css';
import { showAddTask } from './add-task.js';
import { openAddProjectForm, closeAddProjectForm, addProjectClickHandler } from './add-project.js'
import { Project } from './ProjectClass.js'
// import { Task } from './TaskClass.js'

window.taskCounter = 0;

window.projectList = (() => {
    let projects = [];

    const add = (project) => {
        projects.push(project);
    }

    const remove = (projectName) => {
        projects = projects.filter(project => project.name != projectName);
    }

    const getProjects = () => projects;

    return {
        add,
        remove,
        getProjects
    }

})();

window.projectList.add(new Project('Inbox'))

document.querySelector('.add-task-minimized').addEventListener('click', showAddTask)

document.querySelector('.add-project').addEventListener('click', openAddProjectForm)
document.querySelector('.cancel-project-button').addEventListener('click', closeAddProjectForm)
document.querySelector('.add-project-button').addEventListener('click', addProjectClickHandler)