import UserService from "../services/user.service";

const SET_LOGIN_SUCCESS = "SET_LOGIN_SUCCESS";
const SET_LOGIN_FAILURE = "SET_LOGIN_FAILURE";
const SET_LOGOUT = "SET_LOGOUT";
const SET_REGISTER_SUCCESS = "SET_REGISTER_SUCCESS";
const SET_REGISTER_FAILURE = "SET_REGISTER_FAILURE";

const getUser = JSON.parse(localStorage.getItem("user"));
const initialState = getUser
  ? { status: { isUserLoggedIn: true }, user: getUser }
  : { status: { isUserLoggedIn: false }, user: null };

export const user = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return UserService.login(user).then(
        (user) => {
          commit(SET_LOGIN_SUCCESS, user);
          return Promise.resolve(user);
        },
        (error) => {
          commit(SET_LOGIN_FAILURE);
          return Promise.reject(error);
        }
      );
    },

    logout({ commit }) {
      UserService.logout();
      commit(SET_LOGOUT);
    },

    register({ commit }, user) {
      return UserService.register(user).then(
        (res) => {
          commit(SET_REGISTER_SUCCESS);
          return Promise.resolve(res.data);
        },
        (error) => {
          commit(SET_REGISTER_FAILURE);
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    [SET_LOGIN_SUCCESS](state, user) {
      state.status.isUserLoggedIn = true;
      state.user = user;
    },
    [SET_LOGIN_FAILURE](state) {
      state.status.isUserLoggedIn = false;
      state.user = null;
    },

    [SET_LOGOUT](state) {
      state.status.isUserLoggedIn = false;
      state.user = null;
    },

    [SET_REGISTER_SUCCESS](state) {
      state.status.isUserLoggedIn = false;
    },
    [SET_REGISTER_FAILURE](state) {
      state.status.isUserLoggedIn = false;
    },
  },
};
