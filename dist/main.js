/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/add-project.js":
/*!****************************!*\
  !*** ./src/add-project.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addProjectClickHandler": () => (/* binding */ addProjectClickHandler),
/* harmony export */   "closeAddProjectForm": () => (/* binding */ closeAddProjectForm),
/* harmony export */   "openAddProjectForm": () => (/* binding */ openAddProjectForm)
/* harmony export */ });
function openAddProjectForm() {
    document.querySelector('.add-project-form').style.display = 'block';
}

function closeAddProjectForm() {
    document.querySelector('.add-project-form').style.display = 'none';
}

function addProjectClickHandler() {
    // when someone clicks '.add-project-button'
    // read the data in the input field
    // create a new Project with the input data as name
    // add new Project to window.projectList

    console.log(document.querySelector('#name').value)
}

/***/ }),

/***/ "./src/add-task.js":
/*!*************************!*\
  !*** ./src/add-task.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDiv": () => (/* binding */ createDiv),
/* harmony export */   "showAddTask": () => (/* binding */ showAddTask)
/* harmony export */ });
function createDiv(className, text = '') {
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

    let inputField = createDiv('user-input');
    inputField.append(textarea);
    inputField.append(input);

    return inputField
}

function createButtons() {
    let addButton = document.createElement('button');
    addButton.setAttribute('class', 'add-task-button');
    addButton.textContent = 'Add task';

    let cancelButton = document.createElement('button');
    cancelButton.setAttribute('class', 'cancel-button');
    cancelButton.textContent = 'Cancel';

    cancelButton.addEventListener('click', hideAddTask);

    let buttons = createDiv('add-task-buttons')
    buttons.appendChild(cancelButton);
    buttons.appendChild(addButton);

    return buttons
}

function showAddTask() {
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _add_task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-task.js */ "./src/add-task.js");
/* harmony import */ var _add_project_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./add-project.js */ "./src/add-project.js");
// import './style.css';



window.taskCounter = 0;

window.projectList = (() => {
    let projects = [];

    const add = (project) => {
        projects.push(project);
    }

    const remove = (projectName) => {
        projects = projects.filter(project => project.name != projectName);
    }

    const getProjects = () => projects;

    return {
        add,
        remove,
        getProjects
    }

})();

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = []; //array of objects
    }

    addTask(task) {
        // task is instance of class Task
        this.tasks.push(task);
    }

    removeTask(taskName) {
        // taskName is string
        this.tasks = this.tasks.filter(task => task.title != taskName);
    }
}

class Task {
    constructor(title, dueDate = '') {
        this.title = title;
        this.dueDate = dueDate;
        this.id = window.taskCounter++;
        this.isComplete = false;
    }

    get dueDate() {
        return this._dueDate
    }

    set dueDate(value) {
        this._dueDate = value;
    }

    get title() {
        return this._title
    }

    set title(value) {
        this._title = value;
    }

    toggleComplete() {
        this.isComplete = !this.isComplete
    }
} 

window.projectList.add(new Project('Inbox'))


document.querySelector('.add-task-minimized').addEventListener('click', _add_task_js__WEBPACK_IMPORTED_MODULE_0__.showAddTask)

document.querySelector('.add-project').addEventListener('click', _add_project_js__WEBPACK_IMPORTED_MODULE_1__.openAddProjectForm)
document.querySelector('.cancel-project-button').addEventListener('click', _add_project_js__WEBPACK_IMPORTED_MODULE_1__.closeAddProjectForm)
// document.querySelector('.add-project-button').addEventListener('click', closeAddProjectForm)
document.querySelector('.add-project-button').addEventListener('click', _add_project_js__WEBPACK_IMPORTED_MODULE_1__.addProjectClickHandler)

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2ZPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ3hEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05BO0FBQzRDO0FBQ3NEOztBQUVsRzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0Esd0VBQXdFLHFEQUFXOztBQUVuRixpRUFBaUUsK0RBQWtCO0FBQ25GLDJFQUEyRSxnRUFBbUI7QUFDOUY7QUFDQSx3RUFBd0UsbUVBQXNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9hZGQtcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2FkZC10YXNrLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBvcGVuQWRkUHJvamVjdEZvcm0oKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWZvcm0nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlQWRkUHJvamVjdEZvcm0oKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWZvcm0nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkUHJvamVjdENsaWNrSGFuZGxlcigpIHtcbiAgICAvLyB3aGVuIHNvbWVvbmUgY2xpY2tzICcuYWRkLXByb2plY3QtYnV0dG9uJ1xuICAgIC8vIHJlYWQgdGhlIGRhdGEgaW4gdGhlIGlucHV0IGZpZWxkXG4gICAgLy8gY3JlYXRlIGEgbmV3IFByb2plY3Qgd2l0aCB0aGUgaW5wdXQgZGF0YSBhcyBuYW1lXG4gICAgLy8gYWRkIG5ldyBQcm9qZWN0IHRvIHdpbmRvdy5wcm9qZWN0TGlzdFxuXG4gICAgY29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25hbWUnKS52YWx1ZSlcbn0iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlRGl2KGNsYXNzTmFtZSwgdGV4dCA9ICcnKSB7XG4gICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcblxuICAgIHJldHVybiBlbGVtZW50XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUlucHV0RmllbGQoKSB7XG4gICAgbGV0IHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICB0ZXh0YXJlYS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAndGFzay10aXRsZScpO1xuICAgIHRleHRhcmVhLnNldEF0dHJpYnV0ZSgnY29scycsICczMCcpO1xuICAgIHRleHRhcmVhLnNldEF0dHJpYnV0ZSgncm93cycsICc1Jyk7XG4gICAgdGV4dGFyZWEuc2V0QXR0cmlidXRlKCdpZCcsICd0YXNrLXRpdGxlJyk7XG5cbiAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdkYXRlJyk7XG5cbiAgICBsZXQgaW5wdXRGaWVsZCA9IGNyZWF0ZURpdigndXNlci1pbnB1dCcpO1xuICAgIGlucHV0RmllbGQuYXBwZW5kKHRleHRhcmVhKTtcbiAgICBpbnB1dEZpZWxkLmFwcGVuZChpbnB1dCk7XG5cbiAgICByZXR1cm4gaW5wdXRGaWVsZFxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdXR0b25zKCkge1xuICAgIGxldCBhZGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBhZGRCdXR0b24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdhZGQtdGFzay1idXR0b24nKTtcbiAgICBhZGRCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkIHRhc2snO1xuXG4gICAgbGV0IGNhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNhbmNlbEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NhbmNlbC1idXR0b24nKTtcbiAgICBjYW5jZWxCdXR0b24udGV4dENvbnRlbnQgPSAnQ2FuY2VsJztcblxuICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhpZGVBZGRUYXNrKTtcblxuICAgIGxldCBidXR0b25zID0gY3JlYXRlRGl2KCdhZGQtdGFzay1idXR0b25zJylcbiAgICBidXR0b25zLmFwcGVuZENoaWxkKGNhbmNlbEJ1dHRvbik7XG4gICAgYnV0dG9ucy5hcHBlbmRDaGlsZChhZGRCdXR0b24pO1xuXG4gICAgcmV0dXJuIGJ1dHRvbnNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dBZGRUYXNrKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdGFzay1taW5pbWl6ZWQnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVEaXYoJ2FkZC10YXNrLWRldGFpbGVkJyk7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVJbnB1dEZpZWxkKCkpO1xuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlQnV0dG9ucygpKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmNvbXBsZXRlJykuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGhpZGVBZGRUYXNrKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdGFzay1taW5pbWl6ZWQnKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdGFzay1kZXRhaWxlZCcpLnJlbW92ZSgpXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCB7IHNob3dBZGRUYXNrIH0gZnJvbSAnLi9hZGQtdGFzay5qcyc7XG5pbXBvcnQgeyBvcGVuQWRkUHJvamVjdEZvcm0sIGNsb3NlQWRkUHJvamVjdEZvcm0sIGFkZFByb2plY3RDbGlja0hhbmRsZXIgfSBmcm9tICcuL2FkZC1wcm9qZWN0LmpzJ1xuXG53aW5kb3cudGFza0NvdW50ZXIgPSAwO1xuXG53aW5kb3cucHJvamVjdExpc3QgPSAoKCkgPT4ge1xuICAgIGxldCBwcm9qZWN0cyA9IFtdO1xuXG4gICAgY29uc3QgYWRkID0gKHByb2plY3QpID0+IHtcbiAgICAgICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICB9XG5cbiAgICBjb25zdCByZW1vdmUgPSAocHJvamVjdE5hbWUpID0+IHtcbiAgICAgICAgcHJvamVjdHMgPSBwcm9qZWN0cy5maWx0ZXIocHJvamVjdCA9PiBwcm9qZWN0Lm5hbWUgIT0gcHJvamVjdE5hbWUpO1xuICAgIH1cblxuICAgIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4gcHJvamVjdHM7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGQsXG4gICAgICAgIHJlbW92ZSxcbiAgICAgICAgZ2V0UHJvamVjdHNcbiAgICB9XG5cbn0pKCk7XG5cbmNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy50YXNrcyA9IFtdOyAvL2FycmF5IG9mIG9iamVjdHNcbiAgICB9XG5cbiAgICBhZGRUYXNrKHRhc2spIHtcbiAgICAgICAgLy8gdGFzayBpcyBpbnN0YW5jZSBvZiBjbGFzcyBUYXNrXG4gICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcbiAgICB9XG5cbiAgICByZW1vdmVUYXNrKHRhc2tOYW1lKSB7XG4gICAgICAgIC8vIHRhc2tOYW1lIGlzIHN0cmluZ1xuICAgICAgICB0aGlzLnRhc2tzID0gdGhpcy50YXNrcy5maWx0ZXIodGFzayA9PiB0YXNrLnRpdGxlICE9IHRhc2tOYW1lKTtcbiAgICB9XG59XG5cbmNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkdWVEYXRlID0gJycpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICB0aGlzLmlkID0gd2luZG93LnRhc2tDb3VudGVyKys7XG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBkdWVEYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHVlRGF0ZVxuICAgIH1cblxuICAgIHNldCBkdWVEYXRlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2R1ZURhdGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgdGl0bGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aXRsZVxuICAgIH1cblxuICAgIHNldCB0aXRsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl90aXRsZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHRvZ2dsZUNvbXBsZXRlKCkge1xuICAgICAgICB0aGlzLmlzQ29tcGxldGUgPSAhdGhpcy5pc0NvbXBsZXRlXG4gICAgfVxufSBcblxud2luZG93LnByb2plY3RMaXN0LmFkZChuZXcgUHJvamVjdCgnSW5ib3gnKSlcblxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2stbWluaW1pemVkJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93QWRkVGFzaylcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuQWRkUHJvamVjdEZvcm0pXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLXByb2plY3QtYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZUFkZFByb2plY3RGb3JtKVxuLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VBZGRQcm9qZWN0Rm9ybSlcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1idXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZFByb2plY3RDbGlja0hhbmRsZXIpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=