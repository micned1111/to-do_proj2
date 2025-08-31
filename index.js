const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

const createNewTaskBtn = document.getElementById("create-new-task-btn");
const addOrUpdateBtn = document.getElementById("add-or-update-btn");
const quitFormBtn = document.getElementById("quit-form-btn");
const cancelModalBtn = document.getElementById("cancel-modal-btn");
const deleteModalBtn = document.getElementById("delete-modal-btn");

const mainContainer = document.getElementById("main");
const formContainer = document.getElementById("form-for-task");
const tasksOutputContainer = document.getElementById("tasks-output-container");
const quitFormModal = document.getElementById("quit-form-modal");

let taskArr = JSON.parse(localStorage.getItem("tasks-data")) || [];
let currentTask = {};

const addOrUpdateTask = () => {
	if (Object.keys(currentTask).length === 0) {
		const taskObj = {
			id: `${titleInput.value
				.toLowerCase()
				.split(" ")
				.join("-")}-${Date.now()}`,
			title: `${titleInput.value}`,
			date: `${dateInput.value}`,
			description: `${descriptionInput.value}`,
		};

		taskArr.unshift(taskObj);
	} else {
		currentTask.title = titleInput.value;
		currentTask.date = dateInput.value;
		currentTask.description = descriptionInput.value;

		taskArr.forEach(({ id }, index) => {
			if (id === currentTask.id) {
				taskArr.splice(index, 1, currentTask);
			}
		});
	}

	localStorage.setItem("tasks-data", JSON.stringify(taskArr));

	displayTasks();
	reset();
	changeDisplay();
};

const displayTasks = () => {
	tasksOutputContainer.innerHTML = "";

	taskArr.forEach(({ id, title, date, description }) => {
		tasksOutputContainer.innerHTML += `
            <div class="task-item" id="${id}">
                <p>Title: ${title}</p>
                <p>Date: ${date}</p>
                <p>Description: ${description || ""}</p>
                <button id="updateBtn" onclick="updateTask(this)">Update</button>
                <button id="deleteBtn" onclick="deleteTask(this)">Delete</button>
            </div>
        `;
	});
};

const updateTask = (updateBtn) => {
	const idOfTask = updateBtn.parentElement.id;
	const indexOfTask = getIndex(idOfTask);

	currentTask = taskArr[indexOfTask];

	titleInput.value = taskArr[indexOfTask].title;
	dateInput.value = taskArr[indexOfTask].date;
	descriptionInput.value = taskArr[indexOfTask].description;

	addOrUpdateBtn.innerText = "Update task";

	changeDisplay();
};

const deleteTask = (deleteBtn) => {
	const idOfTask = deleteBtn.parentElement.id;
	const indexOfTask = getIndex(idOfTask);
	taskArr.splice(indexOfTask, 1);

	localStorage.setItem("tasks-data", JSON.stringify(taskArr));

	reset();
	displayTasks();
};

const validateInput = () => {
	const regex = /^\s*/g;
	titleInput.value = String(titleInput.value).replace(regex, "");

	if (titleInput.value !== "" && dateInput.value !== "") {
		addOrUpdateTask();
	} else {
		alert("Please input a title and date - description is optional");
		return;
	}
};

createNewTaskBtn.addEventListener("click", () => {
	changeDisplay();
});

formContainer.addEventListener("submit", (e) => {
	e.preventDefault();
	validateInput();
});

quitFormBtn.addEventListener("click", () => {
	if (
		titleInput.value === "" &&
		dateInput.value === "" &&
		descriptionInput.value === ""
	) {
		reset();
		changeDisplay();
		return;
	}
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
	currentTask = {};
	titleInput.value = "";
	dateInput.value = "";
	descriptionInput.value = "";
	addOrUpdateBtn.innerText = "Add task";
};

const getIndex = (id) => {
	const task = taskArr.find((task) => task.id === id);
	return taskArr.indexOf(task);
};

if (taskArr.length > 0) {
	displayTasks();
}
