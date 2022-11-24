import './style.css';

const ProjectList = (() => {
    let projects = [];

    const add = (project) => {
        projects.push(project)
    }

    const remove = (projectName) => {
        projects = projects.filter(project => project.name != projectName);
    }

    const getProjects = () => projects

    return {
        add,
        remove,
        getProjects
    }
})();