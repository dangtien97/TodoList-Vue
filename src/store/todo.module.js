import TodoService from "@/services/todo.service";

const SET_TODOS = "SET_TODOS";
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const UPDATE_STATUS_TODO = "UPDATE_STATUS_TODO";
const SET_SELECTED_TODO = "SET_SELECTED_TODO";
const SET_SEARCH_TODO = "SET_SEARCH_TODO";
const CLEAR_TODOS = "CLEAR_TODOS";

export const todo = {
  namespaced: true,
  state: {
    data: [],
    search: "",
    selectedTodo: null,
  },
  getters: {
    getTodos: (state) => state.data,
    getDoneTodo: (state) =>
      state.data.filter((todo) => todo.status == "completed"),
    getSearchFilter: (state) =>
      state.data.filter((todo) =>
        todo.content.toLowerCase().includes(state.search.toLowerCase())
      ),
    getSelectedTodo: (state) => state.selectedTodo,
  },
  actions: {
    async fetchTodos({ commit, rootState }) {
      const todos = await TodoService.getTodos();
      commit(SET_TODOS, {
        todos,
        rootState,
      });
    },
    async createTodo({ commit }, todo) {
      const response = await TodoService.createTodo(todo);
      commit(ADD_TODO, response);
    },
    async deleteTodo({ commit }, id) {
      await TodoService.deleteTodo(id);
      commit(DELETE_TODO, id);
    },
    async updateTodo({ commit }, todo) {
      const response = await TodoService.updateTodo(todo);
      commit(UPDATE_TODO, response);
    },
    async updateStatusTodo({ commit }, todo) {
      const response = await TodoService.updateTodo(todo);
      commit(UPDATE_STATUS_TODO, response);
    },
    selectTodo({ commit }, id) {
      commit(SET_SELECTED_TODO, id);
    },
    searchTodo({ commit }, searchText) {
      commit(SET_SEARCH_TODO, searchText);
    },
    clearTodo({ commit }) {
      commit(CLEAR_TODOS);
    },
  },
  mutations: {
    [SET_TODOS](_state, { todos, rootState }) {
      rootState.todo.data = todos;
    },
    [ADD_TODO](state, todo) {
      if (todo.content) {
        state.data.push(todo);
      }
    },
    [DELETE_TODO](state, id) {
      let index = state.data.findIndex((todo) => todo.id === id);
      state.data.splice(index, 1);
    },
    [UPDATE_TODO](state, todoEdited) {
      let index = state.data.findIndex((todo) => todo.id === todoEdited.id);
      state.data.splice(index, 1, todoEdited);
      state.selectedTodo = null;
    },
    [UPDATE_STATUS_TODO](state, todo) {
      let index = state.data.findIndex((item) => item.id === todo.id);
      state.data.splice(index, 1, todo);
    },
    [SET_SEARCH_TODO](state, searchText) {
      state.search = searchText;
    },
    [SET_SELECTED_TODO](state, id) {
      state.selectedTodo = id;
    },
    [CLEAR_TODOS](state) {
      state.data.splice(0);
      state.error = null;
    },
  },
};
