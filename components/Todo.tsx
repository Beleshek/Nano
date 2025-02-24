"use client"; 

import { useStore } from '@nanostores/react';
import { todos, addTodo, toggleTodo, removeTodo } from '../store/storeg';
import styles from '../app/todo.module.css';

export default function TodoList() {
  const $todos = useStore(todos);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement & { todo: HTMLInputElement };
    const text = form.todo.value.trim(); 
    if (text) {
      addTodo(Date.now().toString(), text);
      form.todo.value = '';
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ToDo List</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="todo"
          type="text"
          placeholder="Add a new task"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Add
        </button>
      </form>
      <ul className={styles.list}>
        {Object.entries($todos).map(([id, todo]) => (
          <li key={id} className={styles.item}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(id)}
              className={styles.checkbox}
            />
            <span
              className={`${styles.text} ${todo.completed ? styles.completed : ''}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => removeTodo(id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}