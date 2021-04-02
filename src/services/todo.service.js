import axios from "@/lib/axios/axios";

const TODO_PATH = "/api/todos/";

async function getTodos() {
  const response = await axios.get(TODO_PATH);
  const result = response.data.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return result;
}

async function createTodo(todo) {
  const response = await axios.post(TODO_PATH, todo);
  return response.data;
}

async function deleteTodo(id) {
  const response = await axios.delete(TODO_PATH + `${id}`);
  return response.data;
}

async function updateTodo(todo) {
  const response = await axios.put(TODO_PATH + `${todo.id}`, {
    content: todo.content,
    status: todo.status,
  });
  return response.data;
}

const TodoService = {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};

export default TodoService;
