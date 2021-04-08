const SET_IS_LOADING = "SET_IS_LOADING";
const SET_ERROR = "SET_ERROR";
const REMOVE_ERROR = "REMOVE_ERROR";

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
      commit(REMOVE_ERROR);
      commit(SET_IS_LOADING, true);
    },
    setSuccessResponse({ commit }) {
      commit(SET_IS_LOADING, false);
    },
    // For both error request and error response
    setErrorHttp({ commit }, error) {
      commit(SET_ERROR, error);
      commit(SET_IS_LOADING, false);
    },
    removeError({ commit }) {
      commit(REMOVE_ERROR);
    },
  },
  mutations: {
    [SET_IS_LOADING](state, payload) {
      state.isLoading = payload;
    },
    [SET_ERROR](state, error) {
      state.error = error;
    },
    [REMOVE_ERROR](state) {
      state.error = null;
    },
  },
};
