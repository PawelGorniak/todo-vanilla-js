function addNewTask(title) {
	const task = document.createElement('li');
	task.innerHTML = taskInnerHTML(title);
	task.classList.add('single-task');
	taskList.appendChild(task);
}

function taskInnerHTML(title){
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