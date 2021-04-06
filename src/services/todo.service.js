import axios from "@/lib/axios/axios";

const TODO_PATH = "/api/todos";

async function getTodos(page, limit) {
  const response = await axios.get(`${TODO_PATH}?page=${page}&limit=${limit}`);
  return response.items;
}

function createTodo(todo) {
  return axios.post(TODO_PATH, todo);
}

function deleteTodo(id) {
  if (id) {
    const results = id.map((res) => axios.delete(`${TODO_PATH}/${res}`));
    return Promise.all(results);
  }
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
};

export default TodoService;
