import axios from "@/lib/axios/axios";
import { lazyBatchesPromise } from "@/utils";

const TODO_PATH = "/api/todos";

async function getTodos(page, limit) {
  const response = await axios.get(`${TODO_PATH}?page=${page}&limit=${limit}`);
  return response.items;
}

function createTodo(todo) {
  return axios.post(TODO_PATH, todo);
}

function deleteTodo(id) {
  return axios.delete(`${TODO_PATH}/${id}`);
}

function deleteTodoList(todoIds) {
  return lazyBatchesPromise({
    asyncFactoryFunction: deleteTodo,
    items: todoIds,
    batchSize: 10,
    delay: 200,
  });
}

function updateTodo(todo) {
  return axios.put(`${TODO_PATH}/${todo.id}`, {
    content: todo.content,
    status: todo.status,
  });
}

const TodoService = {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  deleteTodoList,
};

export default TodoService;
