<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/todo" class="nav-link">
            Todo List
          </router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
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

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item ml-5">
          <a class="nav-link" href @click.prevent="logOut">
            Log out
          </a>
        </li>
      </div>
    </nav>

    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    currentUser() {
      return this.$store.state.user.user;
    },
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app .navbar-dark .navbar-nav .nav-link {
  color: white;
  font-weight: bold;
  transition: 0.3s;
  font-size: 18px;
}
#app .navbar-dark .navbar-nav .nav-link:hover {
  color: rgb(197, 166, 166);
}
</style>
