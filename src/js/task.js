export class Task {
  constructor(text, completed = false) {
    this.text = text;
    this.completed = completed;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}
