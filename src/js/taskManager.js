import { Task } from './task.js';

export class TaskManager {
  constructor() {
    this.tasks = this.loadTasks();
  }

  loadTasks() {
    const tasksData = localStorage.getItem('tasks');
    return tasksData
      ? JSON.parse(tasksData).map(
          (task) => new Task(task.text, task.completed, task.id)
        )
      : [];
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  addTask(text) {
    const newTask = new Task(text);
    this.tasks.push(newTask);
    this.saveTasks();
    return newTask;
  }

  removeTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  toggleTaskCompletion(id) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.toggleComplete();
      this.saveTasks();
    }
  }
}
