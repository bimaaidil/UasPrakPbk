import { defineStore } from "pinia";

// Utility function to get and set local storage
const useLocalStorage = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    return JSON.parse(storedValue);
  }
  localStorage.setItem(key, JSON.stringify(defaultValue));
  return defaultValue;
};

export const useTodoStore = defineStore("todos", {
  state: () => ({
    todos: useLocalStorage("todos", []),
    hideCompleted: false,
  }),
  actions: {
    addTodo(text) {
      const newTodo = { id: Date.now(), text, done: false };
      this.todos.push(newTodo);
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    toggleHideCompleted() {
      this.hideCompleted = !this.hideCompleted;
    },
  },
  getters: {
    filteredTodos: (state) => {
      if (state.hideCompleted) {
        return state.todos.filter((todo) => !todo.done);
      }
      return state.todos;
    },
  },
});