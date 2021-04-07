const SET_LOADING_STATUS = "SET_LOADING_STATUS";
const SET_ERROR_REQUEST = "SET_ERROR_REQUEST";
const REMOVE_ERROR_REQUEST = "REMOVE_ERROR_REQUEST";

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
    removeError({ commit }) {
      commit(REMOVE_ERROR_REQUEST);
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
    [REMOVE_ERROR_REQUEST](state) {
      state.error = null;
    },
  },
};
