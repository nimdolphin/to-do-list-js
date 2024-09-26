import { TaskManager } from './taskManager.js';

const newTaskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const addTaskButton = document.getElementById('add-task');

const taskManager = new TaskManager();

const renderTasks = () => {
  taskList.innerHTML = '';
  taskManager.tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className =
      'flex items-center justify-between bg-gray-100 p-3 mb-2 rounded';

    const taskContainer = document.createElement('div');
    taskContainer.classList.add('flex', 'items-center');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.classList.add('mr-2');
    checkbox.onclick = () => {
      taskManager.toggleTaskCompletion(index);
      renderTasks();
    };

    const span = document.createElement('span');
    span.innerText = task.text;
    if (task.completed) {
      span.classList.add('line-through');
    }

    const buttonContainer = document.createElement('div');

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.className = 'text-gray-500 mr-4 hover:text-green-700';
    editButton.onclick = () => {
      const newText = prompt('Edit task:', task.text);
      if (newText) {
        taskManager.tasks[index].text = newText;
        taskManager.saveTasks();
        renderTasks();
      }
    };

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'text-orange-500 hover:text-red-700';
    deleteButton.onclick = () => {
      taskManager.removeTask(index);
      renderTasks();
    };

    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(span);

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);
    li.appendChild(taskContainer);
    li.appendChild(buttonContainer);
    taskList.appendChild(li);
  });
};

renderTasks();

addTaskButton.onclick = () => {
  const taskText = newTaskInput.value.trim();
  if (taskText) {
    taskManager.addTask(taskText);
    newTaskInput.value = '';
    renderTasks();
  }
};

newTaskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTaskButton.click();
  }
});
