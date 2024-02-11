const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const imageFilenames = [
  "blue-orange-fish.png",
  "blue-fish.png",
  "violet-fish.png",
  "green-fish.png",
  "yellow-fish.png",
  "indigo-fish.png",
  "Red-fish.png",
];

// Load tasks from localStorage on page load
const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
  listContainer.innerHTML = savedTasks;
  reattachEventListeners();
}

// Function to add a new task category
function createTaskElement(taskText, randomImgFilename) {
  const newTask = document.createElement("li");
  newTask.classList.add("todo-list__category");

  newTask.innerHTML = `
      <div class="todo-list__category-left">
        <img class="todo-list__category-img" src="img/${randomImgFilename}" alt="random fish" />
        <div class="todo-list__category-content">
          <p class="todo-list__category-tasks">${taskText}</p>
          <div class="todo-list__buttons">
            <button class=" todo-list__button-done"><i class="fa-solid fa-check"></i></button>
            <button class="todo-list__button-del"><i class="fa-solid fa-xmark"></i></button>
          </div>
        </div>
      </div>
    `;
  return newTask;
}

function addTask() {
  const taskText = inputBox.value.trim();
  if (taskText !== "") {
    const randomImgFilename =
      imageFilenames[Math.floor(Math.random() * imageFilenames.length)];

    const newTask = createTaskElement(taskText, randomImgFilename);

    listContainer.appendChild(newTask);

    inputBox.value = "";
    attachEventListeners(newTask);

    saveToLocalStorage();
  } else {
    alert("You must write something!");
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", listContainer.innerHTML);
}
function attachEventListeners(taskElement) {
  const doneButton = taskElement.querySelector(".todo-list__button-done");
  const delButton = taskElement.querySelector(".todo-list__button-del");

  doneButton.addEventListener("click", function () {
    listContainer.prepend(taskElement);
    taskElement.classList.add("done");
    saveToLocalStorage();
  });

  delButton.addEventListener("click", function () {
    listContainer.removeChild(taskElement);
    saveToLocalStorage();
  });
}
function reattachEventListeners() {
  const taskElements = document.querySelectorAll(".todo-list__category");
  taskElements.forEach(attachEventListeners);
}
//motivation part
const motivationTexts = [
  "Stay focused and get things done!",
  "Make today amazing!",
  "You've got this!",
  "Embrace the day with positivity!",
  "Keep calm and stay productive!",
  "Hi there! Have a fantastic day!",
  "Hello! Make today amazing!",
  "Greetings! Stay positive and smile!",
];

// Function to set a random motivation text
function setRandomMotivationText() {
  const taskCountElement = document.querySelector(
    ".todo-list__motivation-count"
  );

  const randomMotivation =
    motivationTexts[Math.floor(Math.random() * motivationTexts.length)];

  taskCountElement.textContent = randomMotivation;
}
window.addEventListener("load", setRandomMotivationText);
