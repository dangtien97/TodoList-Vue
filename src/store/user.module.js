import UserService from "@/services/user.service";

const SET_USER = "SET_USER";

const userInLocalStorage = JSON.parse(localStorage.getItem("user"));
const initialState = userInLocalStorage
  ? { user: userInLocalStorage }
  : { user: null };

export const user = {
  namespaced: true,
  state: initialState,
  getters: { getUser: (state) => state.user },
  actions: {
    async login({ commit }, user) {
      const response = await UserService.login(user);
      commit(SET_USER, response);
      return response.data;
    },
    logout({ commit }) {
      UserService.logout();
      commit(SET_USER, null);
    },
    async register(_, user) {
      await UserService.register(user);
    },
  },
  mutations: {
    [SET_USER](state, payload) {
      state.user = payload;
    },
  },
};
