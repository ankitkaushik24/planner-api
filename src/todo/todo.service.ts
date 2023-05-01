import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  private readonly todos = [];

  getTodos() {
    return this.todos;
  }

  getTodo(id: string) {
    return this.todos.find((todo) => todo.id === id);
  }

  createTodo(todo) {
    this.todos.push({ id: uuidv4(), complete: false, ...todo });
    return todo;
  }

  updateTodo(id: string, update: any) {
    const todoIdx = this.findTodoIndex(id);
    if (todoIdx !== -1) {
      this.todos[todoIdx] = { ...this.todos[todoIdx], ...update };
    }
    return this.todos[todoIdx];
  }

  deleteTodo(id: string) {
    const todoIdx = this.findTodoIndex(id);
    return this.todos.splice(todoIdx, 1);
  }

  private findTodoIndex(id: string) {
    return this.todos.findIndex((todo) => todo.id == id);
  }
}
