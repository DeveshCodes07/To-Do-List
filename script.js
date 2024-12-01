// Select elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const themeToggle = document.getElementById('theme-toggle');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.className = `task ${task.completed ? 'completed' : ''}`;
    taskItem.innerHTML = `
      <span>${task.name}</span>
      <div>
        <button onclick="toggleTask(${index})">${task.completed ? '✔' : '❌'}</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

// Add task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskName = taskInput.value.trim();
  if (taskName) {
    tasks.push({ name: taskName, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
  }
});

// Toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Toggle theme
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
  localStorage.setItem('darkMode', isDarkMode);
});

// Load theme preference
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
  themeToggle.textContent = '☀️';
}

// Initial render
renderTasks();
