const newTaskForm = document.querySelector('.new-task-container form');
let taskList = document.querySelector('.tasks-container ul');
document.addEventListener('DOMContentLoaded', function(){
	addListenerNewTask();
	showTasks(tasks);
})
