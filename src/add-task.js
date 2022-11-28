import { Task } from './TaskClass.js'
import { updateTasks } from './display.js'
import { getActiveProject } from './ProjectClass.js';

export function createDiv(className, text = '') {
    let element = document.createElement('div');
    element.classList.add(className);
    element.textContent = text;

    return element
}

function createUserInputField() {
    let additionalInfo = createDiv('additional-info')
    additionalInfo.appendChild(createDateField())
    additionalInfo.appendChild(createPriorityField())

    let userInput = createDiv('user-input')
    userInput.appendChild(createTextArea())
    userInput.appendChild(additionalInfo)

    return userInput
}

function createTextArea() {
    let textarea = document.createElement('textarea');
    textarea.setAttribute('name', 'task-title');
    textarea.setAttribute('cols', '70');
    textarea.setAttribute('rows', '5');
    textarea.setAttribute('id', 'task-title');
    
    return textarea
}

function createDateField() {
    let dateField = document.createElement('input');
    dateField.setAttribute('type', 'date');
    dateField.setAttribute('id', 'due-date')
    return dateField
}

function createPriorityField() {
    let select = document.createElement('select')
    select.setAttribute('id', 'priority')

    let options = [
        { value: 'p4', text: 'Priority' },
        { value: 'p4', text: 'P4 (default)' },
        { value: 'p3', text: 'P3' },
        { value: 'p2', text: 'P2' },
        { value: 'p1', text: 'P1' }
    ]

    for (let i = 0; i < options.length; i++) {
        let option = document.createElement('option')
        option.setAttribute('value', options[i].value)
        option.textContent = options[i].text

        if (i == 0) {
            option.setAttribute('class', 'placeholder')
            option.setAttribute('disabled', 'true')
            option.setAttribute('selected', 'selected')
        }
        select.appendChild(option)
    }

    return select
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
    
    let userInput = createUserInputField();
    let buttons = createButtons();

    element.appendChild(userInput);
    element.appendChild(buttons);

    document.querySelector('.incomplete').appendChild(element);
}

function hideAddTask() {
    document.querySelector('.add-task-minimized').style.display = 'flex';
    document.querySelector('.add-task-detailed').remove()
}
 
function addTaskClickHandler() {
    // read user input 
    let taskName = document.querySelector('#task-title').value;
    let dueDate = document.querySelector('#due-date').value;
    let priority = document.querySelector('#priority').value;

    // alert user if task name is empty
    if (!taskName) {
        alert('Task name cannot be empty')
        return
    }

    // create new Task
    let task = new Task(taskName, dueDate, priority);

    // add new task to current project
    getActiveProject().addTask(task);

    // refresh task list
    updateTasks();

    // reset user input
    document.querySelector('#task-title').value = ''
    document.querySelector('#due-date').value = ''
    document.querySelector('#priority .placeholder').selected = true;
}