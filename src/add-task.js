import { Task } from './TaskClass.js'
import { updateTasks } from './display.js'
import { getActiveProject } from './ProjectClass.js';

export function createDiv(className, text = '') {
    let element = document.createElement('div');
    element.classList.add(className);
    element.textContent = text;

    return element
}

function createInputField() {
    let textarea = document.createElement('textarea');
    textarea.setAttribute('name', 'task-title');
    textarea.setAttribute('cols', '30');
    textarea.setAttribute('rows', '5');
    textarea.setAttribute('id', 'task-title');

    let input = document.createElement('input');
    input.setAttribute('type', 'date');
    input.setAttribute('id', 'due-date')

    let inputField = createDiv('user-input');
    inputField.append(textarea);
    inputField.append(input);

    return inputField
}

function createButtons() {
    let addButton = document.createElement('button');
    addButton.setAttribute('class', 'add-task-button');
    addButton.textContent = 'Add task';

    addButton.addEventListener('click', addTaskClickHandler);

    let cancelButton = document.createElement('button');
    cancelButton.setAttribute('class', 'cancel-button');
    cancelButton.textContent = 'Cancel';

    cancelButton.addEventListener('click', hideAddTask);

    let buttons = createDiv('add-task-buttons')
    buttons.appendChild(cancelButton);
    buttons.appendChild(addButton);

    return buttons
}

export function showAddTask() {
    document.querySelector('.add-task-minimized').style.display = 'none';

    let element = createDiv('add-task-detailed');
    element.appendChild(createInputField());
    element.appendChild(createButtons());

    document.querySelector('.incomplete').appendChild(element);
}

function hideAddTask() {
    document.querySelector('.add-task-minimized').style.display = 'flex';
    document.querySelector('.add-task-detailed').remove()
}
 
function addTaskClickHandler() {
    // read user data 
    let taskName = document.querySelector('#task-title').value;
    let taskDueDate = document.querySelector('#due-date').value;

    // alert user if task name is empty
    if (!taskName) {
        alert('Task name cannot be empty')
        return
    }

    // create new Task
    let task = new Task(taskName, taskDueDate);

    // add new task to current project
    getActiveProject().addTask(task);[]

    // refresh task list
    updateTasks();

    // clear inputs
    document.querySelector('#task-title').value = ''
    document.querySelector('#due-date').value = ''
}