import { createDiv } from "./add-task.js"

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
    let projects = window.projectList.getProjects();

    for (let i = 0; i < projects.length; i++) {
        let element = createDiv('project', projects[i].name);
        document.querySelector('.projects').insertBefore(
            element, document.querySelector('.add-project')
        );
    }
}


function updateTasks() {
    // clear DOM tasks

    // update project title

    // get list of tasks

    // iterate through tasks
        // create .task div
        // append to .incomplete div, inserting before .add-task-minimized
    return
}