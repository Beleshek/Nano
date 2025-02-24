import { atom, map } from 'nanostores';

interface Todo {
  text: string;
  completed: boolean;
}

export const todos = map<Record<string, Todo>>({});

export function addTodo(id: string, text: string) {
  todos.setKey(id, { text, completed: false });
}


export function toggleTodo(id: string) {
  const todo = todos.get()[id];
  if (todo) {
    todos.setKey(id, { ...todo, completed: !todo.completed });
  }
}


export function removeTodo(id: string) {
  const newTodos = { ...todos.get() };
  delete newTodos[id];
  todos.set(newTodos);
}