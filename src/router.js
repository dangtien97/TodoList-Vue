import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      // lazy-loaded
      component: () => import("./views/Todo.vue"),
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/todo",
      name: "Todo",
      // lazy-loaded
      component: () => import("./views/Todo.vue"),
    },
  ],
});
