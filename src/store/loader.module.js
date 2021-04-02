const SET_SEND_REQUEST = "SET_SEND_REQUEST";
const SET_ERROR_REQUEST = "SET_ERROR_REQUEST";
const SET_END_REQUEST = "SET_END_REQUEST";
const CLEAR_ERROR_REQUEST = "CLEAR_ERROR_REQUEST";

export const loader = {
  namespaced: true,
  state: {
    isLoading: false,
    error: null,
  },
  getters: {
    isLoading: (state) => state.isLoading,
    getError: (state) => state.error,
  },
  actions: {
    sendRequest({ commit }) {
      commit(SET_SEND_REQUEST);
    },
    setError({ commit }, error) {
      commit(SET_ERROR_REQUEST, error);
    },
    endRequest({ commit }) {
      commit(SET_END_REQUEST);
    },
    clearError({ commit }) {
      commit(CLEAR_ERROR_REQUEST);
    },
  },
  mutations: {
    [SET_SEND_REQUEST](state) {
      state.isLoading = true;
    },
    [SET_ERROR_REQUEST](state, error) {
      state.error = error;
      state.isLoading = false;
    },
    [SET_END_REQUEST](state) {
      state.isLoading = false;
    },
    [CLEAR_ERROR_REQUEST](state) {
      state.error = null;
    },
  },
};
