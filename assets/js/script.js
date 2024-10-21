let tasks = [
  { id: 1, description: "Tarea inicial 1", completed: false },
  { id: 2, description: "Tarea inicial 2", completed: false },
  { id: 3, description: "Tarea inicial 3", completed: false },
];

const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const totalTasksElement = document.getElementById("total-tasks");
const completedTasksElement = document.getElementById("completed-tasks");

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    if (task.completed) taskItem.classList.add("completed");

    taskItem.innerHTML = `
            <span>${task.description}</span>
            <div>
                <button onclick="toggleTask(${task.id})">${
      task.completed ? "Desmarcar" : "Marcar"
    }</button>
                <button onclick="deleteTask(${task.id})">Eliminar</button>
            </div>
        `;
    taskList.appendChild(taskItem);
  });

  updateSummary();
}

function updateSummary() {
  totalTasksElement.textContent = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  completedTasksElement.textContent = completedTasks;
}

function addTask() {
  const taskDescription = taskInput.value.trim();
  if (taskDescription !== "") {
    const newTask = {
      id: Date.now(),
      description: taskDescription,
      completed: false,
    };
    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function toggleTask(id) {
  const task = tasks.find((task) => task.id === id);
  task.completed = !task.completed;
  renderTasks();
}

document.getElementById("add-task-btn").addEventListener("click", addTask);

renderTasks();
