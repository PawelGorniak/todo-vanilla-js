/* document.addEventListener('DOMContentLoaded', function(){
	// addListenerNewTask();
	showTasks(tasks);
})
*/

const dataController = (function(){
	const tasks = [
	'Przeczytac ksiazke',
	'Pojsc biegac',
	'Posprzatac piwnice',
	'Naprawic kran'
	];
	return {
		getTasks: function(){
			return tasks;
		},
		dataAddTask: function(task){

		}

	}
})();


const UIController = (function() {
	
	const DOMstrings = {
	newTaskForm: ".new-task-container form",
	taskList: ".tasks-container ul",
	completeBtn: ".toogle-complete-btn",
	deleteBtn: ".delete-task-btn",
	newTaskInput: ".new-task__input"
	};

	const taskInnerHTML = function(title){
			return `<div class="input-group">
						<div class="input-group-prepend">
							<button class="btn btn-light toogle-complete-btn" type="button"><i class="far fa-check-circle"></i></button>
						</div>
						<input type="text" class="form-control" placeholder="Nowe zadanie ..." name="task-to-add" value="${title}">
						<div class="input-group-append">
							<button class="btn btn-danger delete-task-btn" type="button"><i class="far fa-times-circle"></i></button>
						</div>
					</div>`;
					}

	return {
		getInputNewTask: function(){
		return document.querySelector(DOMstrings.newTaskInput).value;
		},
		getDOMStrings: function() {
			return DOMstrings;
		},
		addNewTask: function(taskTitle) {
			const taskList = document.querySelector(DOMstrings.taskList);
			// create new element list item
			const task = document.createElement('li');
			task.innerHTML = taskInnerHTML(taskTitle);
			task.classList.add('single-task');
			// add new element to list
			taskList.appendChild(task);			
		},
		showTasks: function(tasks){
			tasks.forEach(function(current){
		UIController.addNewTask(current);		
	})
		}
	}
})();


const appController = (function(){

	const setupListeners = function(){
	const DOM = UIController.getDOMStrings();

	// add listener to new task form
	document.querySelector(DOM.newTaskForm).addEventListener('submit', ctrlAddItem);

	// add listener to delete and complete buttons
	document.querySelector(DOM.taskList).addEventListener('click', ctrlDelComplete);
		

		
	};

	const ctrlAddItem = function(event){
		event.preventDefault();

		// get value from newTaskInput
  		const newItemValue = UIController.getInputNewTask();

  		// add new Item
		if(newItemValue){			
			UIController.addNewTask(newItemValue);
		}
	};

	const ctrlDelComplete = function(event){
		const btn = event.target.closest('button');
		if (btn.classList.contains('delete-task-btn')){
			console.log("dupa");
			btn.parentNode.parentNode.remove();
		} else if(btn.classList.contains('toogle-complete-btn')){
			$(btn).toggleClass('btn-success btn-light');
		}
	}

return {
	init: function(){
		setupListeners();
		UIController.showTasks(dataController.getTasks());			
		}
	}

}
)();

appController.init();


