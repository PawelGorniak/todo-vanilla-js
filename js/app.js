/* document.addEventListener('DOMContentLoaded', function(){
	// addListenerNewTask();
	showTasks(tasks);
})
*/

const dataController = (function(){

	let tasksData = [
		/*
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
		 */
	]

	const importLS = function(nameLS){

			return JSON.parse(localStorage.getItem(nameLS));
		};
// const test = localStorage.getItem('1');
	return {
		getTasks: function(){

			return tasksData;
		},
		addNewTask: function(newID, taskTitle){	

			tasksData.push({
				id: [newID],
				title: taskTitle });
		},
		updateLS: function(nameLS){
				// const tasksString = data.join(',');	

				localStorage.setItem(nameLS, JSON.stringify(tasksData));
		},
		updateData(LSArray){	
			const importedTasksArray = importLS(LSArray);			
			if (importedTasksArray){
			tasksData = importedTasksArray;}

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

	const taskInnerHTML = function(id, title){
			return `<div class="input-group">
						<div class="input-group-prepend">
							<button class="btn btn-light toogle-complete-btn" type="button"><i class="far fa-check-circle"></i></button>
						</div>
						<input type="text" class="form-control" id="id-${id}" placeholder="Nowe zadanie ..." name="task-to-add" value="${title}">
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
		addNewTask: function(id, taskTitle) {			
			const taskList = document.querySelector(DOMstrings.taskList);
			// create new element list item
			const task = document.createElement('li');
			task.innerHTML = taskInnerHTML(id, taskTitle);
			task.classList.add('single-task');
			// add new element to list
			taskList.appendChild(task);			
		},
		showTasks: function(tasksObj){
console.log(tasksObj);
			for (var key in tasksObj){


				let current = tasksObj[key];
				UIController.addNewTask("1", current.title);	

			}	
		}
	}
})();


const controller = (function(){
	const ctrlSets = {
		LSTasksArray: 'tasksArray'

	}

	const ctrlSetupListeners = function(){
	const DOM = UIController.getDOMStrings();

	// add listener to new task form
	document.querySelector(DOM.newTaskForm).addEventListener('submit', ctrlAddItem);

	// add listener to delete and complete buttons
	document.querySelector(DOM.taskList).addEventListener('click', ctrlDelComplete);
		

		
	};

	const ctrlAddItem = function(event){
		let newID;
		event.preventDefault();

		// get value from newTaskInput
  		const newItemValue = UIController.getInputNewTask();
  		

  		// add new Item
		if(newItemValue){
			const data = dataController.getTasks();
			console.log(data);
			if(data.length > 0){
			const lastID = data[data.length - 1].id;
			newID =  +lastID + 1;}
			else {
			newID = 0;
			}
			console.log(newID);
			UIController.addNewTask(newID, newItemValue);
			dataController.addNewTask(newID, newItemValue);
			dataController.updateLS(ctrlSets.LSTasksArray);		
		}
	};

	const ctrlDelComplete = function(event){
		const btn = event.target.closest('button');
		if (btn.classList.contains('delete-task-btn')){
			btn.parentNode.parentNode.remove();
			// del this task from data
			// update LS
		} else if(btn.classList.contains('toogle-complete-btn')){
			$(btn).toggleClass('btn-success btn-light');
		}
	};

	const ctrlInitData = function(){		
		dataController.updateData(ctrlSets.LSTasksArray);

	}

return {
	init: function(){
		ctrlInitData();
		ctrlSetupListeners();
		UIController.showTasks(dataController.getTasks());
		
		
		}
	}

}
)();

controller.init();


