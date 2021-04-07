import axios from "@/lib/axios/axios";

const TODO_PATH = "/api/todos";

const sleep = (wait) => new Promise((r) => setTimeout(r, wait));

async function getTodos(page, limit) {
  const response = await axios.get(`${TODO_PATH}?page=${page}&limit=${limit}`);
  return response.items;
}

function createTodo(todo) {
  return axios.post(TODO_PATH, todo);
}

async function deleteTodo(id) {
  const chunks = (requests, chunkSize) => {
    let results = [];
    for (let i = 0, j = requests.length; i < j; i += chunkSize) {
      results.push(requests.slice(i, i + chunkSize));
    }
    return results;
  };
  const requests = id.map((res) => {
    return axios.delete(`${TODO_PATH}/${res}`);
  });
  const chunkedRequests = chunks(requests, 2);

  console.log({ chunkedRequests });

  for (const chunk of chunkedRequests) {
    await Promise.all(chunk);
    await sleep(4000);
  }

  // return Promise.all(
  //   chunks(requests, 2).map((request, index) =>
  //     setTimeout(() => {
  //       return Promise.all()
  //     }, 1000 * index)
  //   )
  // );
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
