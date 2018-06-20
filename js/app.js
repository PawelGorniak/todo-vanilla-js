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
	newTaskInput: ".new-task__input"
	};

	const taskInnerHTML = function(title){
			return `<div class="input-group">
						<div class="input-group-prepend">
							<button class="btn btn-light toogle-complete-btn" type="button"><i class="far fa-check-circle"></i></button>
						</div>
						<input type="text" class="form-control" placeholder="Nowe zadanie ..." name="task-to-add" value=" ${title}">
						<div class="input-group-append">
						<button class="btn btn-danger delete-task-btn" type="button"><i class="far fa-times-circle"></i></button>
						</div>
						</div>
						`
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

			// add Event listeners to btn delete and complete 
			const toogleCompleteBtn = task.querySelector(UIController.getDOMStrings().completeBtn);
			const deleteTaskBtn = task.querySelector(UIController.getDOMStrings().deleteBtn);

			toogleCompleteBtn.addEventListener('click', function(){
				toogleComplete(this);
			}) 

			deleteTaskBtn.addEventListener('click', function(){
				deleteTask(this);
			})
			
		}
	}
})();


const appController = (function(){

	const setupListeners = function(){
	const DOM = UIController.getDOMStrings();

	// add listener to new task form
	document.querySelector(DOM.newTaskForm).addEventListener('submit', ctrlAddItem);
		

		
	};

	const ctrlAddItem = function(event){
		event.preventDefault();

		// get value from newTaskInput
  		const newItemValue = UIController.getInputNewTask();

  		// add new Item
		if(newItemValue){			
			UIController.addNewTask(newItemValue);
		}
	}
	

	// add delete listener

	// add complete listener


return {
	init: function(){
		setupListeners();

	}
}
})();

appController.init();


