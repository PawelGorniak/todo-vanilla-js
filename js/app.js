/* document.addEventListener('DOMContentLoaded', function(){
	// addListenerNewTask();
	showTasks(tasks);
})
*/

const dataController = (function(){

	const dataTasks = [
		{
			id: "0",
		 	title: "Przeczytac ksiazke",
		 },
		 {
			id: "1",
		 	title: "Pojsc biegac",
		 },
		 {
			id: "2",
		 	title: "Wyjśc z psem",
		 },
		 {
			id: "3",
		 	title: "Posprzątac piwnicę",
		 }
	]
// const test = localStorage.getItem('1');
	return {
		getTasks: function(){
			return dataTasks;
		},
		addNewTask: function(taskTitle){
			dataTasks.push({
				id: "jeden",
				title: taskTitle });
		},
		addLocalStorage: function(data){
				// const tasksString = data.join(',');				
				localStorage.setItem("taskArray", JSON.stringify(data));
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
		showTasks: function(tasksObj){
			for (var key in tasksObj){
				let current = tasksObj[key];
				UIController.addNewTask(current.title);		
			}	
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
			dataController.addNewTask(newItemValue);
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
		dataController.addLocalStorage(dataController.getTasks());		
		}
	}

}
)();

appController.init();


