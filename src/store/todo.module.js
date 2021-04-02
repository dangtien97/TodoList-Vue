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
    selectedTodoToEdit: null,
  },
  getters: {
    getTodos: (state) => state.data,
    getDoneTodo: (state) =>
      state.data.filter((todo) => todo.status == "completed"),
    getSearchFilter: (state) =>
      state.data.filter((todo) =>
        todo.content.toLowerCase().includes(state.search.toLowerCase())
      ),
    getSelectedTodoToEdit: (state) => state.selectedTodoToEdit,
  },
  actions: {
    fetchTodos({ commit, rootState }) {
      TodoService.getTodos().then((todos) =>
        commit(SET_TODOS, {
          todos,
          rootState,
        })
      );
    },
    createTodo({ commit }, todo) {
      TodoService.createTodo(todo).then((todo) => commit(ADD_TODO, todo));
    },
    deleteTodo({ commit }, id) {
      TodoService.deleteTodo(id).then(() => commit(DELETE_TODO, id));
    },
    updateTodo({ commit }, todo) {
      TodoService.updateTodo(todo).then((todo) => commit(UPDATE_TODO, todo));
    },
    updateStatusTodo({ commit }, todo) {
      TodoService.updateTodo(todo).then((todo) =>
        commit(UPDATE_STATUS_TODO, todo)
      );
    },
    selectTodoToEdit({ commit }, id) {
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
    [SET_TODOS](state, { todos, rootState }) {
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
      state.selectedTodoToEdit = null;
    },
    [UPDATE_STATUS_TODO](state, todo) {
      let index = state.data.findIndex((item) => item.id === todo.id);
      state.data.splice(index, 1, todo);
    },
    [SET_SEARCH_TODO](state, searchText) {
      state.search = searchText;
    },
    [SET_SELECTED_TODO](state, id) {
      if (id) {
        state.selectedTodoToEdit = id;
      } else {
        state.selectedTodoToEdit = null;
      }
    },
    [CLEAR_TODOS](state) {
      state.data.splice(0);
      state.error = null;
    },
  },
};
