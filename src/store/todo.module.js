import UserService from "../services/user.service";

export const todo = {
  namespaced: true,
  state: {
    isLoading: false,
    error: null,
    data: [],
  },
  getters: {
    allTodos: (state) => state.data,
    todosDone: (state) =>
      state.data.filter((todo) => todo.status == "completed"),
    loading: (state) => state.isLoading,
    error: (state) => state.error,
  },
  actions: {
    fetchTodos({ commit, rootState }) {
      commit("set_pending");
      UserService.getTodosAPI()
        .then((todos) =>
          commit("fetch_todos", {
            todos,
            rootState,
          })
        )
        .catch((e) => commit("set_error", e))
        .finally(() => commit("set_end_request"));
    },
    async addTodo({ commit }, todo) {
      commit("set_pending");
      await UserService.addTodoAPI(todo)
        .then((todo) => commit("add_todo", todo))
        .catch((e) => commit("set_error", e))
        .finally(() => commit("set_end_request"));
    },
    async deleteTodo({ commit }, id) {
      commit("set_pending");
      await UserService.deleteTodoAPI(id)
        .then(() => commit("delete_todo", id))
        .catch((e) => commit("set_error", e))
        .finally(() => commit("set_end_request"));
    },
    async updateTodo({ commit }, todo) {
      commit("set_pending");
      await UserService.updateTodoAPI(todo)
        .then((todo) => commit("update_todo", todo))
        .catch((e) => commit("set_error", e))
        .finally(() => commit("set_end_request"));
    },
    async statusTodo({ commit }, todo) {
      commit("set_pending");
      await UserService.updateTodoAPI(todo)
        .then((todo) => commit("status_todo", todo))
        .catch((e) => commit("set_error", e))
        .finally(() => commit("set_end_request"));
    },
    clearTodo({ commit }) {
      commit("clear_todo");
    },
  },
  mutations: {
    fetch_todos(state, { todos, rootState }) {
      rootState.todo.data = todos;
    },
    add_todo(state, todo) {
      if (todo.content) {
        state.data.push(todo);
      }
    },
    delete_todo(state, id) {
      let index = state.data.findIndex((todo) => todo.id === id);
      state.data.splice(index, 1);
    },
    update_todo(state, todoEdited) {
      let index = state.data.findIndex((todo) => todo.id === todoEdited.id);
      state.data.splice(index, 1, todoEdited);
    },
    status_todo(state, todo) {
      let index = state.data.findIndex((item) => item.id === todo.id);
      state.data.splice(index, 1, todo);
    },

    clear_todo(state) {
      state.data.splice(0);
    },

    set_pending(state) {
      state.isLoading = true;
    },
    set_error(state, e) {
      state.error = e;
      state.isLoading = false;
    },
    set_end_request(state) {
      state.isLoading = false;
    },
  },
};
