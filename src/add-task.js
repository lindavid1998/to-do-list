import Task from './TaskClass';
import createDiv from './create-div';
import { updateTasks } from './display';
import { getActiveProject } from './ProjectClass';
import { saveToLocalStorage } from './local-storage';

function createDateField() {
  const dateField = document.createElement('input');
  dateField.setAttribute('type', 'date');
  dateField.setAttribute('id', 'due-date');
  return dateField;
}

function createPriorityField() {
  const select = document.createElement('select');
  select.setAttribute('id', 'priority');

  const options = [
    { value: 'p4', text: 'Priority' },
    { value: 'p4', text: 'P4 (default)' },
    { value: 'p3', text: 'P3' },
    { value: 'p2', text: 'P2' },
    { value: 'p1', text: 'P1' },
  ];

  for (let i = 0; i < options.length; i++) {
    const option = document.createElement('option');
    option.setAttribute('value', options[i].value);
    option.textContent = options[i].text;

    if (i == 0) {
      option.setAttribute('class', 'placeholder');
      option.setAttribute('disabled', 'true');
      option.setAttribute('selected', 'selected');
    }
    select.appendChild(option);
  }

  return select;
}

function createTextArea() {
  const textarea = document.createElement('textarea');
  textarea.setAttribute('name', 'task-title');
  textarea.setAttribute('cols', '70');
  textarea.setAttribute('rows', '5');
  textarea.setAttribute('id', 'task-title');

  return textarea;
}

function createUserInputField() {
  const additionalInfo = createDiv('additional-info');
  additionalInfo.appendChild(createDateField());
  additionalInfo.appendChild(createPriorityField());

  const userInput = createDiv('user-input');
  userInput.appendChild(createTextArea());
  userInput.appendChild(additionalInfo);

  return userInput;
}

function hideAddTask() {
  document.querySelector('.add-task-minimized').style.display = 'flex';
  document.querySelector('.add-task-detailed').remove();
}

function addTaskClickHandler() {
  // read user input
  const taskName = document.querySelector('#task-title').value;
  let dueDate = document.querySelector('#due-date').value;
  const priority = document.querySelector('#priority').value;

  // convert date input to local time
  if (dueDate != '') {
    const utcDate = new Date(dueDate);
    dueDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
  }

  // alert user if task name is empty
  if (!taskName) {
    alert('Task name cannot be empty');
    return;
  }

  // create new Task
  const task = new Task(taskName, dueDate, priority);

  // add new task to current project
  getActiveProject().addTask(task);

  // update local storage
  saveToLocalStorage();

  // refresh task list
  updateTasks();

  // reset user input
  document.querySelector('#task-title').value = '';
  document.querySelector('#due-date').value = '';
  document.querySelector('#priority .placeholder').selected = true;
}

function createButtons() {
  const addButton = document.createElement('button');
  addButton.classList.add('button', 'add-task');
  addButton.textContent = 'Add task';

  addButton.addEventListener('click', addTaskClickHandler);

  const cancelButton = document.createElement('button');
  cancelButton.classList.add('button', 'cancel-task');
  cancelButton.textContent = 'Cancel';

  cancelButton.addEventListener('click', hideAddTask);

  const buttons = createDiv('add-task-buttons');
  buttons.append(cancelButton, addButton);

  return buttons;
}

export default function showAddTask() {
  document.querySelector('.add-task-minimized').style.display = 'none';

  const element = createDiv('add-task-detailed');

  const userInput = createUserInputField();
  const buttons = createButtons();
  element.append(userInput, buttons);

  document.querySelector('.incomplete').appendChild(element);
}
