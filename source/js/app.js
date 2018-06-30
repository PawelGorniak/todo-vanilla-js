

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

	
	const ObjTask = function(id, title, complete){
		this.id = id;
		this.title = title;
		this.complete = complete;
	};

	const importLS = function(nameLS){
			return JSON.parse(localStorage.getItem(nameLS));
		};

	const findID = function(id){
		const arrayID = tasksData.findIndex(function(element){
				return element.id === id;
			});
		return arrayID;
	}
// const test = localStorage.getItem('1');
	return {
		getTasks: function(){
			return tasksData;
		},
		addNewTask: function(newID, taskTitle){	
			const newTask = new ObjTask(newID, taskTitle, 0);			
			tasksData.push(newTask);
		},
		delTask: function(id){			
			tasksData.splice(findID(id),1);
		},
		updateLS: function(nameLS){
				// const tasksString = data.join(',');	
				localStorage.setItem(nameLS, JSON.stringify(tasksData));
		},
		updateData(LSArray){	
			const importedTasksArray = importLS(LSArray);			
			if (importedTasksArray){
			tasksData = importedTasksArray;}
		},
		completeTask(id){
			console.log(id);
			console.log(findID(id));
			tasksData[findID(id)].complete = 0 ? 1 : 0;

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

	const taskInnerHTML = function(id, title, complete){

			return `<div class="input-group">
						<div class="input-group-prepend">
							<button class="btn ${
								complete ? "btn-success":"btn-light"  } toogle-complete-btn" type="button"><i class="far fa-check-circle"></i></button>
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
		addNewTask: function(id, taskTitle, complete) {			
			const taskList = document.querySelector(DOMstrings.taskList);
			// create new element list item
			const task = document.createElement('li');
			task.innerHTML = taskInnerHTML(id, taskTitle, complete);
			task.classList.add('single-task');
			task.id = `id-${id}`;
			// add new element to list
			taskList.appendChild(task);			
		},
		showTasks: function(tasksObj){
			for (var key in tasksObj){
				let current = tasksObj[key];
				UIController.addNewTask(current.id, current.title, current.complete);	
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
			if(data.length > 0){
			const lastID = data[data.length - 1].id;
			newID =  +lastID + 1;}
			else {
			newID = 0;
			}
			UIController.addNewTask(newID, newItemValue);
			dataController.addNewTask(newID, newItemValue);
			dataController.updateLS(ctrlSets.LSTasksArray);		
		}
	};

	const ctrlDelComplete = function(event){
		const btn = event.target.closest('button');
		const idElement = parseInt(btn.parentNode.parentNode.parentNode.id.split('-')[1]);
		if (btn.classList.contains('delete-task-btn')){ 
			
			dataController.delTask(idElement);
			dataController.updateLS(ctrlSets.LSTasksArray);	
			btn.parentNode.parentNode.parentNode.remove();
			// del this task from data

			// update LS
		} else if(btn.classList.contains('toogle-complete-btn')){
			$(btn).toggleClass('btn-success btn-light');
			dataController.completeTask(idElement);
			dataController.updateLS(ctrlSets.LSTasksArray);	
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


