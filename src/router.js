import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

Vue.use(Router);

const router = new Router({
	mode: "history",
	base: process.env.NODE_ENV === "production" ? "/TodoList-Vue/" : "/",
	routes: [
		{
			path: "/",
			name: "Home",
			// lazy-loaded
			component: () => import("./views/Todo.vue"),
			meta: {
				requireAuth: true,
			},
		},
		{
			path: "/login",
			name: "Login",
			component: () => import("./views/Login.vue"),
		},
		{
			path: "/register",
			name: "Register",
			component: () => import("./views/Register.vue"),
		},
	],
});

router.beforeEach((to, from, next) => {
	const user = store.getters["user/getUser"];
	if (to.meta.requireAuth && !user) next({ name: "Login" });
	if (to.name === "Login" && user) next({ path: from.path });
	next();
});

export { router };
