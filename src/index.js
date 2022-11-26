import './style.css';
import { showAddTask } from './add-task.js';
import { openAddProjectForm, closeAddProjectForm, addProjectClickHandler } from './add-project.js'
import { Project, ProjectList } from './ProjectClass.js'
import { updateScreen } from './display';

let inbox = new Project('Inbox');
inbox.active = true;
ProjectList.add(inbox);

// initial loading
updateScreen()

// add event listeners
document.querySelector('.add-task-minimized').addEventListener('click', showAddTask)
document.querySelector('.add-project').addEventListener('click', openAddProjectForm)
document.querySelector('.cancel-project-button').addEventListener('click', closeAddProjectForm)
document.querySelector('.add-project-button').addEventListener('click', addProjectClickHandler)