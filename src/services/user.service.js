import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://todo-mvc-api-typeorm.herokuapp.com/api/todos/";

class UserService {
  getTodosAPI() {
    return axios.get(API_URL, { headers: authHeader() }).then((res) => {
      res.data.sort((a, b) =>
        a.created_at > b.created_at ? 1 : b.created_at > a.created_at ? -1 : 0
      );
      return res.data;
    });
  }

  addTodoAPI(todo) {
    return axios
      .post(API_URL, todo, { headers: authHeader() })
      .then((res) => res.data);
  }

  deleteTodoAPI(id) {
    return axios
      .delete(API_URL + `${id}`, { headers: authHeader() })
      .then((res) => res.data);
  }

  updateTodoAPI(todo) {
    return axios
      .put(
        API_URL + `${todo.id}`,
        {
          content: todo.content,
          status: todo.status,
        },
        { headers: authHeader() }
      )
      .then((res) => res.data);
  }
}

export default new UserService();
