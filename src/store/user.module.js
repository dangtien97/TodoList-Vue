import UserService from "@/services/user.service";

const SET_USER = "SET_USER";
const REMOVE_USER = "REMOVE_USER";

export const user = {
  namespaced: true,
  state: { user: null },
  getters: { getUser: (state) => state.user },
  actions: {
    async login({ commit }, user) {
      const response = await UserService.login(user);
      if (response.token) {
        commit(SET_USER, response);
      }
      return response.data;
    },
    logout({ commit }) {
      commit(REMOVE_USER);
    },
    async register(_, user) {
      await UserService.register(user);
    },
  },
  mutations: {
    [SET_USER](state, user) {
      state.user = user;
    },
    [REMOVE_USER](state) {
      state.user = null;
    },
  },
};
