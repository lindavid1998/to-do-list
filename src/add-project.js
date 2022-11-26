import { Project } from './ProjectClass.js'

export function openAddProjectForm() {
    document.querySelector('.add-project-form').style.display = 'block';
}

export function closeAddProjectForm() {
    document.querySelector('.add-project-form').style.display = 'none';
}

export function addProjectClickHandler() {
    // get user input
    let projectName = document.querySelector('#name').value

    // alert if project name is already taken
    let projects = window.projectList.getProjects()
    if (projects.filter(project => project.name == projectName).length > 0) {
        alert('Project name already taken')
        return
    }

    // add to project list
    window.projectList.add(new Project(projectName)) 

    // reset and close form
    document.querySelector('#name').value = ''
    closeAddProjectForm()
}