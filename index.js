const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

const addTaskBtn = document.getElementById("create-new-task-btn");
const addOrUpdateBtn = document.getElementById("add-or-update-btn");
const quitFormBtn = document.getElementById("quit-form-btn");
const cancelModalBtn = document.getElementById("cancel-modal-btn");
const deleteModalBtn = document.getElementById("delete-modal-btn");

const mainContainer = document.getElementById("main");
const formContainer = document.getElementById("form-for-task");
const tasksOutputContainer = document.getElementById("tasks-output-container");
const quitFormModal = document.getElementById("quit-form-modal");

let taskArr = [];
let currentTask = {};

const addOrUpdateTask = () => {
    

    //displayTasks();
};

const displayTasks = () => {
    //
}

addTaskBtn.addEventListener("click", () => {
	changeDisplay();
});

formContainer.addEventListener("submit", (e) => {
	e.preventDefault();

	if (titleInput.value !== "" && dateInput.value !== "") {
		addOrUpdateTask();
	} else {
		alert("Please input a title and date - description is optional");
		return;
	}
});

quitFormBtn.addEventListener("click", () => {
	quitFormModal.showModal();
});

cancelModalBtn.addEventListener("click", () => {
	quitFormModal.close();
});

deleteModalBtn.addEventListener("click", () => {
	quitFormModal.close();
	reset();
	changeDisplay();
});

const changeDisplay = () => {
	mainContainer.classList.toggle("hidden");
	formContainer.classList.toggle("hidden");
};

const reset = () => {
	titleInput.value = "";
	dateInput.value = "";
	descriptionInput.value = "";
};
