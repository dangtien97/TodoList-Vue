import TodoService from "@/services/todo.service";

const SET_TODOS = "SET_TODOS";
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const SET_EDITING_TODO = "SET_EDITING_TODO";
const SET_DELETING_TODOS = "SET_DELETING_TODOS";
const SET_SEARCH_TODO = "SET_SEARCH_TODO";
const REMOVE_TODOS = "REMOVE_TODOS";

export const todo = {
  namespaced: true,
  state: {
    data: [],
    search: "",
    editingTodo: null,
    deletingTodos: [],
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
    getEditingTodo: (state) => state.editingTodo,
    getDeletingTodos: (state) => state.deletingTodos,
    isCanFetchMoreTodos: (state) => state.isCanFetchMoreTodos,
  },
  actions: {
    async fetchTodos({ commit }, { page, limit }) {
      const todos = await TodoService.getTodos(page, limit);
      commit(SET_TODOS, { todos, page });
    },
    async createTodo({ commit }, todo) {
      const response = await TodoService.createTodo(todo);
      commit(ADD_TODO, response);
    },
    async deleteTodo({ commit }, todoIds) {
      await TodoService.deleteTodoList(todoIds);
      commit(DELETE_TODO, todoIds);
    },
    async updateTodo({ commit }, todo) {
      const response = await TodoService.updateTodo(todo);
      commit(UPDATE_TODO, response);
    },
    selectTodoToEdit({ commit }, id) {
      commit(SET_EDITING_TODO, id);
    },
    selectTodosToDelete({ commit }, todoIds) {
      commit(SET_DELETING_TODOS, todoIds);
    },
    searchTodo({ commit }, searchText) {
      commit(SET_SEARCH_TODO, searchText);
    },
    removeTodos({ commit }) {
      commit(REMOVE_TODOS);
    },
  },
  mutations: {
    [SET_TODOS](state, { todos, page }) {
      // if(todos.length && page === 1) {
      //   state.data = [];
      //   state.data.push(...todos);
      // } else if(todos.length && page !== 1) {
      //   state.data.push(...todos);
      // } else {
      //   state.isCanFetchMoreTodos = false;
      // }
      if (todos.length) {
        if (page === 1) state.data = [];
        state.data.push(...todos);
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
      state.deletingTodos = [];
    },
    [UPDATE_TODO](state, todoEdited) {
      let index = state.data.findIndex((todo) => todo.id === todoEdited.id);
      state.data.splice(index, 1, todoEdited);
      state.editingTodo = null;
    },
    [SET_SEARCH_TODO](state, searchText) {
      state.search = searchText;
    },
    [SET_EDITING_TODO](state, id) {
      state.editingTodo = id;
    },
    [SET_DELETING_TODOS](state, todoIds) {
      if (todoIds.length === state.data.length) {
        if (state.deletingTodos.length === state.data.length)
          state.deletingTodos = [];
        else {
          state.deletingTodos = [];
          todoIds.map((id) => state.deletingTodos.push(id));
        }
      } else {
        let index = state.deletingTodos.findIndex((res) => res === todoIds[0]);
        if (index >= 0) state.deletingTodos.splice(index, 1);
        else state.deletingTodos.push(todoIds[0]);
      }
    },
    [REMOVE_TODOS](state) {
      state.data.splice(0);
      state.error = null;
    },
  },
};
