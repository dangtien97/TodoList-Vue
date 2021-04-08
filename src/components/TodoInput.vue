<template>
  <div>
    <form class="form-inline justify-content-center mb-4">
      <input
        v-model="todoText"
        type="text"
        class="form-control col-6 col-sm-6 col-lg-4 mx-3"
        placeholder="Add task here"
      />
      <button
        @click.prevent="handleAdd"
        class="btn btn-primary col-4 col-sm-2 col-lg-1"
        :disabled="!todoText"
      >
        Add Todo
      </button>
    </form>
    <form class="form-inline justify-content-center mb-4">
      <input
        @input="handleSearch"
        type="text"
        class="form-control col-10 col-sm-6 col-lg-4"
        placeholder="You can search here"
      />
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "TodoInput",
  mixins: [],
  data: function() {
    return {
      todoText: "",
      searchText: "",
    };
  },
  methods: {
    ...mapActions("todo", ["createTodo", "searchTodo", "selectTodoToEdit"]),
    handleAdd() {
      this.selectTodoToEdit(null);
      this.createTodo({
        content: this.todoText,
      });
      this.todoText = "";
    },
    handleSearch(e) {
      this.searchText = "";
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.searchText = e.target.value;
        this.searchTodo(this.searchText);
      }, 500);
    },
  },
};
</script>

<style scoped></style>
