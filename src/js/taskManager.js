import { Task } from './task.js';

export class TaskManager {
  constructor() {
    this.tasks = this.loadTasks();
  }

  loadTasks() {
    const tasksData = localStorage.getItem('tasks');
    return tasksData
      ? JSON.parse(tasksData).map((task) => new Task(task.text, task.completed))
      : [];
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  addTask(text) {
    const newTask = new Task(text);
    this.tasks.push(newTask);
    this.saveTasks();
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  toggleTaskCompletion(index) {
    this.tasks[index].toggleComplete();
    this.saveTasks();
  }
}
