function sortTasksByName(tasks, order) {
  // sorts Task array by Task.title
  // input: array of Task objects, order: 1 -> asc, -1 -> desc
  // output: none

  tasks.sort((a, b) => order * a.title.localeCompare(b.title));
}

function sortTasksByPriority(tasks, order) {
  // sorts Task array by Task.priority
  // input: array of Task objects, order: 1 -> asc, -1 -> desc
  // output: none

  tasks.sort((a, b) => order * b.priority.localeCompare(a.priority));
}

function sortTasksByDueDate(tasks, order) {
  // sorts Task  array by Task.dueDate, empty dates will be sorted to the end
  // input: array of Task objects, order: 1 -> asc, -1 -> desc
  // output: none

  tasks.sort((a, b) => {
    // if a has no due date but b does, sort after b
    if (!a.dueDate && b.dueDate) {
      return 1;
      // if b has no due date but a does, sort after a
    }
    if (!b.dueDate && a.dueDate) {
      return -1;
      // if neither have due date, keep order
    }
    if (!a.dueDate && !b.dueDate) {
      return 0;
    }
    if (a.dueDate.getTime() > b.dueDate.getTime()) {
      return order * 1;
    }
    if (a.dueDate.getTime() < b.dueDate.getTime()) {
      return order * -1;
    }
    return 0;
  });
}

export { sortTasksByDueDate, sortTasksByName, sortTasksByPriority };
