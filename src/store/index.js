import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import { user } from "@/store/user.module";
import { todo } from "@/store/todo.module";
import { loader } from "@/store/loader.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    todo,
    loader,
    plugins: [createPersistedState({ paths: ["user"] })],
  },
});
