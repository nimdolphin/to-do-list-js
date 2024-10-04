import { TaskManager } from './taskManager.js';

const newTaskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const addTaskButton = document.getElementById('add-task');
const taskTemplate = document.getElementById('task-template').content;

const taskManager = new TaskManager();

const renderTask = (task) => {
  const clone = document.importNode(taskTemplate, true);

  const taskElement = clone.querySelector('li');
  taskElement.setAttribute('data-id', task.id);

  const checkbox = clone.querySelector('input[type="checkbox"]');
  const taskText = clone.querySelector('span');
  const editButton = clone.querySelector('button:first-of-type');
  const deleteButton = clone.querySelector('button:last-of-type');

  checkbox.checked = task.completed;
  taskText.innerText = task.text;

  if (task.completed) {
    taskText.classList.add('line-through');
  } else {
    taskText.classList.remove('line-through');
  }

  checkbox.onclick = () => {
    taskManager.toggleTaskCompletion(task.id);
    taskText.classList.toggle('line-through', checkbox.checked);
  };

  editButton.onclick = () => {
    const newText = prompt('Edit task:', task.text);
    if (newText) {
      taskManager.tasks.find((t) => t.id === task.id).text = newText;
      taskManager.saveTasks();
      taskText.innerText = newText;
    }
  };

  deleteButton.onclick = () => {
    taskManager.removeTask(task.id);
    const taskToRemove = document.querySelector(`li[data-id="${task.id}"]`);
    if (taskToRemove) {
      taskToRemove.remove();
    }
  };

  taskList.appendChild(clone);
};

const renderTasks = () => {
  taskList.innerHTML = '';
  taskManager.tasks.forEach((task) => {
    renderTask(task);
  });
};

addTaskButton.onclick = () => {
  const taskText = newTaskInput.value.trim();
  if (taskText) {
    const newTask = taskManager.addTask(taskText);
    renderTask(newTask);
    newTaskInput.value = '';
    newTaskInput.focus();
  }
};

newTaskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTaskButton.click();
  }
});

renderTasks();
