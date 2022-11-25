function createDiv(className, text = '') {
    let element = document.createElement('div');
    element.classList.add(className);
    element.textContent = text;

    return element
}

export function loadAddTaskView() {
    document.querySelector('.add-task').style.display = 'none';

    let textarea = document.createElement('textarea');
    textarea.setAttribute('name', 'task-title');
    textarea.setAttribute('cols', '30');
    textarea.setAttribute('rows', '5');
    textarea.setAttribute('id', 'task-title');

    let input = document.createElement('input');
    input.setAttribute('type', 'date');

    let taskInfo = createDiv('task-info');
    taskInfo.append(textarea);
    taskInfo.append(input);

    let addButton = document.createElement('button');
    addButton.setAttribute('class', 'add-task-button');
    addButton.textContent = 'Add task';

    let cancelButton = document.createElement('button');
    cancelButton.setAttribute('class', 'cancel-button');
    cancelButton.textContent = 'Cancel';

    cancelButton.addEventListener('click', hideAddTaskView);

    let addTaskButtons = createDiv('add-task-buttons')
    addTaskButtons.appendChild(cancelButton);
    addTaskButtons.appendChild(addButton);

    let element = createDiv('add-task-detailed');
    element.appendChild(taskInfo);
    element.appendChild(addTaskButtons);

    document.querySelector('.incomplete').appendChild(element);
}

function hideAddTaskView() {
    document.querySelector('.add-task').style.display = 'flex';
    document.querySelector('.add-task-detailed').remove()
}