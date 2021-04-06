<template>
  <div class="layout-default">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            Todo List
          </router-link>
        </li>
      </div>

      <div v-if="!getUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            Login
          </router-link>
        </li>
      </div>

      <div v-if="getUser" class="navbar-nav ml-auto">
        <li class="nav-item ml-5">
          <a class="nav-link" href @click.prevent="logOut">
            Log out
          </a>
        </li>
      </div>
    </nav>
    <main :style="isLoading ? { pointerEvents: 'none', opacity: '0.7' } : {}">
      <slot />
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("user", ["getUser"]),
    ...mapGetters("loader", ["isLoading"]),
  },
  methods: {
    logOut() {
      this.$store.dispatch("user/logout");
      this.$store.dispatch("todo/clearTodo");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.navbar-dark .navbar-nav .nav-link {
  color: white;
  font-weight: bold;
  transition: 0.3s;
  font-size: 18px;
}
.navbar-dark .navbar-nav .nav-link:hover {
  color: rgb(197, 166, 166);
}
</style>
