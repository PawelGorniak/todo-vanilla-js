function addNewTask(title) {
	const taskList = document.querySelector(UIController.getDOMStrings().taskList);
	// cerate new element list item
	const task = document.createElement('li');
	task.innerHTML = itemHTML(title);
	task.classList.add('single-task');

	// add Event listeners to btn delete and complete 
	const toogleCompleteBtn = task.querySelector(UIController.getDOMStrings().completeBtn);
	const deleteTaskBtn = task.querySelector(UIController.getDOMStrings().deleteBtn);

	toogleCompleteBtn.addEventListener('click', function(){
		toogleComplete(this);
	}) 

	deleteTaskBtn.addEventListener('click', function(){
		deleteTask(this);
	})
	taskList.appendChild(task);



}

function itemHTML(title){
	return '<div class="input-group">' +
						'<div class="input-group-prepend">'+
							'<button class="btn btn-light toogle-complete-btn" type="button"><i class="far fa-check-circle"></i></button>'
						+ '</div>' +
						'<input type="text" class="form-control" placeholder="Nowe zadanie ..." name="task-to-add" value="' + title + '">' +
						'<div class="input-group-append">'+ 
							'<button class="btn btn-danger delete-task-btn" type="button"><i class="far fa-times-circle"></i></button>' +
						'</div>' +
				'</div>';
}

/* ---- add event listener to new task form --- */

/* function addListenerNewTask(){
	const newTaskForm = document.querySelector(UIController.getDOMStrings().newTaskForm);
	newTaskForm.addEventListener('submit',function(event){
		event.preventDefault();
		const newValue = this.querySelector('input').value;
		if(newValue){ addNewTask(newValue); }
	});
}
*/