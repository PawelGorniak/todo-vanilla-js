

function showTasks(tasks){	
	tasks.forEach(function(title){
		UIController.addNewTask(title);		
	})
}


// toogle complete task

function toogleComplete(btnComplete){

	$(btnComplete).toggleClass('btn-success btn-light');
}


// delete task
function deleteTask(btnDelete){
	const taskUl = btnDelete.closest('ul');
	const taskLi = btnDelete.closest('li');
	taskUl.removeChild(taskLi);	
}