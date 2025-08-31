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
	if (addOrUpdateBtn.innerText === "Add Task") {
        const regex = /[^a-zA-Z0-9 ]/g;
		const taskObj = {
			id: `${titleInput.value
                .replace(regex, "")
				.toLowerCase()
				.split(" ")
				.join("-")}-${Date.now()}`,
			title: `${titleInput.value}`,
			date: `${dateInput.value}`,
			description: `${descriptionInput.value}`,
            completed: false,
		};

		taskArr.unshift(taskObj);
	} else {
        currentTask.title = titleInput.value;
        currentTask.date = dateInput.value;
        currentTask.description = descriptionInput.value;

        const index = getIndex(currentTask.id);
		taskArr[index] = currentTask;
	}

	localStorage.setItem("tasks-data", JSON.stringify(taskArr));

	displayTasks();
	reset();
	changeDisplay();
};

const displayTasks = () => {
	tasksOutputContainer.innerHTML = "";

	taskArr.forEach(({ id, title, date, description, completed }) => {
        const checkbox = completed ?  
            `<span><input id="completedCheckbox" type="checkbox" onclick="changeChecked(this)" checked/></span>` :
            `<span><input id="completedCheckbox" type="checkbox" onclick="changeChecked(this)" /></span>`;

		tasksOutputContainer.innerHTML += `
            <div class="task-item" id="${id}">
                <p>Title: ${title}</p>
                <p>Date: ${date}</p>
                <p>Description: ${description || ""}</p>
                <div class="task-item-footer">
                    <span><button id="updateBtn" onclick="updateTask(this)">Update</button></span>
                    <span><button id="deleteBtn" onclick="deleteTask(this)">Delete</button></span>
                    ${checkbox}
                </div>
            </div>
        `;
	});
};

const updateTask = (updateBtn) => {
	const idOfTask = updateBtn.closest(".task-item").id;
	currentTask = taskArr[getIndex(idOfTask)];

	titleInput.value = currentTask.title;
	dateInput.value = currentTask.date;
	descriptionInput.value = currentTask.description;

	addOrUpdateBtn.innerText = "Update Task";
	changeDisplay();
};

const deleteTask = (deleteBtn) => {
	const idOfTask = deleteBtn.closest(".task-item").id;
	const indexOfTask = getIndex(idOfTask);
	taskArr.splice(indexOfTask, 1);

	localStorage.setItem("tasks-data", JSON.stringify(taskArr));

	reset();
	displayTasks();
};

const changeChecked = (checkbox) => {
    const idOfTask = checkbox.closest(".task-item").id;
    const task = taskArr[getIndex(idOfTask)];
    task.completed = task.completed ? false : true;
    localStorage.setItem("tasks-data", JSON.stringify(taskArr));
}

const validateInput = () => {
    const regex = /\s{2,}/g;
	titleInput.value = String(titleInput.value).replace(regex, " ").trim();

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
	addOrUpdateBtn.innerText = "Add Task";
};

const getIndex = (id) => {
	const task = taskArr.find((task) => task.id === id);
	return taskArr.indexOf(task);
};

if (taskArr.length > 0) {
	displayTasks();
}
