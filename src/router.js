import Vue from "vue";
import Router from "vue-router";

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
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/register",
      component: () => import("./views/Register.vue"),
    },
    {
      path: "/todo",
      name: "Todo",
      component: () => import("./views/Todo.vue"),
    },
  ],
});
