document.addEventListener('DOMContentLoaded', function(){
	/* addListenerNewTask(); */
	showTasks(tasks);
})

const UIController = (function() {
	const DOMstrings = {
	newTaskForm: ".new-task-container form",
	taskList: ".tasks-container ul",
	completeBtn: ".toogle-complete-btn",
	deleteBtn: ".delete-task-btn",
	newTaskValue: ".new-task__input"
	}

	return {
		getDOMStrings: function() {
			return DOMstrings;
		}
	}
})();


const appController = (function(){

	const setupListeners = function(){
		const DOM = UIController.getDOMStrings();

		document.querySelector(DOM.newTaskForm).addEventListener('submit',function(event){
		event.preventDefault();
		const newValue = this.querySelector(DOM.newTaskValue).value;
		if(newValue){ addNewTask(newValue); }
	});

	} 

	// add listener to new task

	// add delete listener

	// add complete listener


return {
	init: function(){
		setupListeners();

	}
}
})();

appController.init();


