<template>
  <div>
    <h1 class="m-5 text-center">Hello {{ currentUser.username }}!</h1>
    <div
      class="row mt-4 mb-2 justify-content-center align-items-center align-items-center"
    >
      <p class="detail all">You have {{ allTodos.length }} tasks</p>
      <p class="detail todo-done">Done: {{ todosDone.length }}</p>
    </div>
    <div
      class="row mt-2 mb-4 justify-content-center align-items-center align-items-center"
    >
      <p class="detail error" v-if="error">{{ error }}</p>
    </div>
    <todo-input />
    <div>
      <div class="todo-item" v-for="todo in allTodos" :key="todo.id">
        <todo-item :todo="todo" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TodoInput from "../components/TodoInput.vue";
import TodoItem from "../components/TodoItem.vue";

export default {
  components: { TodoInput, TodoItem },
  name: "Todo",
  computed: {
    ...mapGetters("todo", ["allTodos", "todosDone", "error"]),
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("todo/fetchTodos");
    if (!this.$store.state.auth.user) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.detail {
  font-size: 16px;
  padding: 4px 14px;
  border-radius: 15px;
  font-weight: 500;
  margin: 0 5px;
  font-weight: bold;
}

.detail.all {
  background-color: rgba(128, 128, 128, 0.205);
}

.detail.todo-done {
  background-color: rgb(23, 228, 23);
}

.detail.error {
  color: red;
  background-color: rgba(255, 255, 0, 0.5);
}
</style>
