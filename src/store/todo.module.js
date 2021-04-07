import TodoService from "@/services/todo.service";

const SET_TODOS = "SET_TODOS";
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const SET_SELECTED_TODO = "SET_SELECTED_TODO";
const SET_SELECTED_TODOS = "SET_SELECTED_TODOS";
const SET_SEARCH_TODO = "SET_SEARCH_TODO";
const CLEAR_TODOS = "CLEAR_TODOS";

export const todo = {
  namespaced: true,
  state: {
    data: [],
    search: "",
    selectedTodoToEdit: null,
    selectedTodosToDelete: [],
    isCanFetchMoreTodos: true,
  },
  getters: {
    getTodos: (state) => state.data,
    getDoneTodo: (state) =>
      state.data.filter((todo) => todo.status === "completed"),
    getSearchFilter: (state) =>
      state.data.filter((todo) =>
        todo.content.toLowerCase().includes(state.search.toLowerCase())
      ),
    getSelectedTodoToEdit: (state) => state.selectedTodoToEdit,
    getSelectedTodosToDelete: (state) => state.selectedTodosToDelete,
    isCanFetchMoreTodos: (state) => state.isCanFetchMoreTodos,
  },
  actions: {
    async fetchTodos({ commit }, { page, limit }) {
      const todos = await TodoService.getTodos(page, limit);
      commit(SET_TODOS, todos);
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
    selectTodo({ commit }, id) {
      commit(SET_SELECTED_TODO, id);
    },
    selectTodos({ commit }, id) {
      commit(SET_SELECTED_TODOS, id);
    },
    searchTodo({ commit }, searchText) {
      commit(SET_SEARCH_TODO, searchText);
    },
    clearTodo({ commit }) {
      commit(CLEAR_TODOS);
    },
  },
  mutations: {
    [SET_TODOS](state, todos) {
      if (todos.length) {
        state.data.push(...todos);
        state.selectedTodosToDelete = [];
      } else {
        state.isCanFetchMoreTodos = false;
      }
    },
    [ADD_TODO](state, todo) {
      if (todo.content) {
        state.data.unshift(todo);
      }
    },
    [DELETE_TODO](state, id) {
      id.map((res) => {
        let index = state.data.findIndex((todo) => todo.id === res);
        state.data.splice(index, 1);
      });
      state.selectedTodosToDelete = [];
    },
    [UPDATE_TODO](state, todoEdited) {
      let index = state.data.findIndex((todo) => todo.id === todoEdited.id);
      state.data.splice(index, 1, todoEdited);
      state.selectedTodoToEdit = null;
    },
    [SET_SEARCH_TODO](state, searchText) {
      state.search = searchText;
    },
    [SET_SELECTED_TODO](state, id) {
      state.selectedTodoToEdit = id;
    },
    [SET_SELECTED_TODOS](state, id) {
      if (id === "all") {
        if (state.selectedTodosToDelete.length === state.data.length) {
          state.selectedTodosToDelete = [];
        } else {
          state.selectedTodosToDelete = [];
          state.data.map((todo) => state.selectedTodosToDelete.push(todo.id));
        }
      } else {
        let index = state.selectedTodosToDelete.findIndex((res) => res === id);
        if (index >= 0) {
          state.selectedTodosToDelete.splice(index, 1);
        } else state.selectedTodosToDelete.push(id);
      }
    },
    [CLEAR_TODOS](state) {
      state.data.splice(0);
      state.error = null;
    },
  },
};
