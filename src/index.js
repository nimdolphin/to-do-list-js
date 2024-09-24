const newTask = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const addTaskButton = document.getElementById('add-task');

const addTaskToDOM = (taskText, isCompleted = false) => {
  const li = document.createElement('li');
  li.classList.add(
    'flex',
    'items-center',
    'justify-between',
    'bg-gray-100',
    'p-3',
    'mb-2',
    'rounded'
  );

  const taskContainer = document.createElement('div');
  taskContainer.classList.add('flex', 'items-center');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = isCompleted;
  checkbox.classList.add('mr-2');
  checkbox.addEventListener('change', completeTask);

  const text = document.createElement('span');
  text.textContent = taskText;
  if (isCompleted) {
    text.classList.add('line-through');
  }

  const buttonContainer = document.createElement('div');

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.classList.add('text-gray-500', 'mr-4', 'hover:text-green-700');
  editButton.addEventListener('click', () => editTask(taskText, li));

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('text-orange-500', 'hover:text-red-700');
  deleteButton.addEventListener('click', () => deleteTask(li));

  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);

  taskContainer.appendChild(checkbox);
  taskContainer.appendChild(text);

  li.appendChild(taskContainer);
  li.appendChild(buttonContainer);

  taskList.appendChild(li);
};

const addTask = () => {
  const taskText = newTask.value.trim();

  if (taskText !== '') {
    addTaskToDOM(taskText);
    saveTasks();
    newTask.value = '';
  }
};

const deleteTask = (li) => {
  taskList.removeChild(li);
  saveTasks();
};

const editTask = (taskText, li) => {
  const newTaskText = prompt('Edit task:', taskText);
  if (newTaskText !== null && newTaskText.trim() !== '') {
    li.querySelector('span').textContent = newTaskText.trim();
    saveTasks();
  }
};

const completeTask = (event) => {
  const task = event.target;
  const li = task.parentElement;
  li.classList.toggle('line-through');
};

const saveTasks = () => {
  const tasks = [];
  taskList.querySelectorAll('li').forEach((li) => {
    const taskText = li.querySelector('span').textContent;
    const isCompleted = li.querySelector('input[type="checkbox"]').checked;
    tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => {
    addTaskToDOM(task.text, task.completed);
  });
};

document.addEventListener('DOMContentLoaded', loadTasks);
addTaskButton.addEventListener('click', addTask);
