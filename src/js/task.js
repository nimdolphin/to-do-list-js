export class Task {
  constructor(text, completed = false) {
    this.id = Date.now() + Math.random();
    this.text = text;
    this.completed = completed;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}
