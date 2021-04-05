import UserService from "../services/user.service";

const SET_LOGIN_SUCCESS = "SET_LOGIN_SUCCESS";
const SET_LOGOUT = "SET_LOGOUT";

const getUser = JSON.parse(localStorage.getItem("user"));
const initialState = getUser ? { user: getUser } : { user: null };

export const user = {
  namespaced: true,
  state: initialState,
  getters: { getUser: (state) => state.user },
  actions: {
    async login({ commit }, user) {
      const response = await UserService.login(user);
      commit(SET_LOGIN_SUCCESS, response);
      return response.data;
    },
    logout({ commit }) {
      UserService.logout();
      commit(SET_LOGOUT);
    },
    async register(_, user) {
      const response = await UserService.register(user);
      return response.data;
    },
  },
  mutations: {
    [SET_LOGIN_SUCCESS](state, user) {
      state.user = user;
    },
    [SET_LOGOUT](state) {
      state.user = null;
    },
  },
};
