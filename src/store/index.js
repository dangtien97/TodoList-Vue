import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./auth.module";
import { todo } from "./todo.module";
import { loader } from "./loader.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    todo,
    loader,
  },
});
