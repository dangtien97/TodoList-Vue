export const loader = {
  namespaced: true,
  state: {
    isLoading: false,
    error: null,
  },
  getters: {
    loading: (state) => state.isLoading,
    error: (state) => state.error,
  },
  actions: {
    sendRequest({ commit }) {
      commit("send_request");
    },
    setError({ commit }, error) {
      commit("set_error", error);
    },
    endRequest({ commit }) {
      commit("end_request");
    },
    clearError({ commit }) {
      commit("clear_error");
    },
  },
  mutations: {
    send_request(state) {
      state.isLoading = true;
    },
    set_error(state, error) {
      state.error = error;
      state.isLoading = false;
    },
    end_request(state) {
      state.isLoading = false;
    },
    clear_error(state) {
      state.error = null;
    },
  },
};
