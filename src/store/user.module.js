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
    login({ commit }, user) {
      return UserService.login(user).then((user) => {
        commit(SET_LOGIN_SUCCESS, user);
        return user.data;
      });
    },
    logout({ commit }) {
      UserService.logout();
      commit(SET_LOGOUT);
    },
    register(_, user) {
      return UserService.register(user).then((res) => res.data);
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
