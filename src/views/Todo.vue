<template>
  <layout-default>
    <h1 class="m-5 text-center">Hello {{ getUser.username }}!</h1>
    <div
      class="listDetail row mt-4 mb-2 justify-content-center align-items-center align-items-center"
    >
      <p class="detail all">All: {{ getTodos.length }} tasks</p>
      <p class="detail todo-done">Done: {{ getDoneTodo.length }}</p>
    </div>
    <div
      class="row mt-2 mb-4 justify-content-center align-items-center align-items-center"
    >
      <p class="detail error" v-if="getError">{{ getError }}</p>
    </div>
    <todo-input />
    <div class="row justify-content-center col-xs-12 col-10 align-items-center">
      <input
        type="checkbox"
        :checked="this.getTodos.length === this.getDeletingTodos.length"
        @click="selectTodosToDelete(getTodos.map((todo) => todo.id))"
      />
      <button
        class="btn btn-danger mx-2"
        @click="handleDeleteTodos"
        :disabled="getDeletingTodos.length < 1"
      >
        Delete Tasks
      </button>
      <p class="detail all ">Selected: {{ getDeletingTodos.length }}</p>
    </div>
    <div id="todo-list">
      <div class="todo-item" v-for="todo in getSearchFilter" :key="todo.id">
        <todo-item :todo="todo" />
      </div>
    </div>
    <div class="loading mb-4" v-show="isLoading">
      <span class="spinner-border spinner-border-sm"></span>
      Loading...
    </div>
  </layout-default>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TodoInput from "@/components/TodoInput.vue";
import TodoItem from "@/components/TodoItem.vue";
import LayoutDefault from "@/layout/LayoutDefault.vue";

export default {
  components: { TodoInput, TodoItem, LayoutDefault },
  name: "Todo",
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    ...mapGetters("todo", [
      "getSearchFilter",
      "getTodos",
      "getDoneTodo",
      "isCanFetchMoreTodos",
      "getDeletingTodos",
    ]),
    ...mapGetters("loader", ["isLoading", "getError"]),
    ...mapGetters("user", ["getUser"]),
  },
  methods: {
    ...mapActions("todo", ["deleteTodo", "selectTodosToDelete"]),
    async loadMore() {
      if (!this.isCanFetchMoreTodos) return;
      await this.$store.dispatch("todo/fetchTodos", {
        page: ++this.page,
        limit: 10,
      });
    },
    handleDeleteTodos() {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.deleteTodo(this.getDeletingTodos);
          }
        });
    },
  },
  mounted() {
    this.$store.dispatch("todo/fetchTodos", {
      page: 1,
      limit: 10,
    });
    window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.loadMore();
      }
    });
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

.listDetail.row {
  margin-left: 0;
  margin-right: 0;
}
</style>
