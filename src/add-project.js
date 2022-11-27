import { Project, ProjectList } from './ProjectClass.js'
import { updateProjects } from './display.js'

export function openAddProjectForm() {
    document.querySelector('.add-project-form').style.display = 'block';
}

export function closeAddProjectForm() {
    document.querySelector('.add-project-form').style.display = 'none';
}

export function addProjectClickHandler() {
    // get user input
    let name = document.querySelector('#name').value

    // alert if input is empty
    if (name == '') {
        alert('Project name cannot be empty')
        return 
    }

    // alert if project name is already taken
    let projects = ProjectList.getProjects()
    if (projects.find(project => project.name == name)) {
        alert('Project name already taken')
        return
    }

    // add to project list
    ProjectList.add(new Project(name))

    // reset and close form
    document.querySelector('#name').value = ''
    closeAddProjectForm()

    // update project list
    updateProjects()
}