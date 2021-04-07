const SET_LOADING_STATUS = "SET_LOADING_STATUS";
const SET_ERROR_REQUEST = "SET_ERROR_REQUEST";
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
      commit(SET_LOADING_STATUS, true);
    },
    setError({ commit }, error) {
      commit(SET_ERROR_REQUEST, error);
    },
    endRequest({ commit }) {
      commit(SET_LOADING_STATUS, false);
    },
    clearError({ commit }) {
      commit(CLEAR_ERROR_REQUEST);
    },
  },
  mutations: {
    [SET_LOADING_STATUS](state, payload) {
      state.isLoading = payload;
    },
    [SET_ERROR_REQUEST](state, error) {
      state.error = error;
      state.isLoading = false;
    },
    [CLEAR_ERROR_REQUEST](state) {
      state.error = null;
    },
  },
};
