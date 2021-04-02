import axios from "@/lib/axios/axios";

const TODO_PATH = "/api/todos/";

async function getTodosAPI() {
  const response = await axios.get(TODO_PATH);
  const result = response.data.sort((a, b) =>
    a.created_at > b.created_at ? 1 : b.created_at > a.created_at ? -1 : 0
  );
  return result;
}

async function addTodoAPI(todo) {
  const response = await axios.post(TODO_PATH, todo);
  return response.data;
}

async function deleteTodoAPI(id) {
  const response = await axios.delete(TODO_PATH + `${id}`);
  return response.data;
}

async function updateTodoAPI(todo) {
  const response = await axios.put(TODO_PATH + `${todo.id}`, {
    content: todo.content,
    status: todo.status,
  });
  return response.data;
}

const UserService = {
  getTodosAPI,
  addTodoAPI,
  deleteTodoAPI,
  updateTodoAPI,
};

export default UserService;
