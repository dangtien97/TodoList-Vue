<template>
  <div>
    <form class="form-inline justify-content-center mb-4">
      <input
        v-model="todoText"
        :disabled="loading || error"
        type="text"
        class="form-control col-6 col-sm-6 col-lg-4 mx-3"
        placeholder="Add task here"
      />
      <button
        @click.prevent="handleAdd"
        class="btn btn-primary col-4 col-sm-2 col-lg-1"
        :disabled="loading || error || !todoText"
      >
        Add Todo
      </button>
    </form>
    <form class="form-inline justify-content-center mb-4">
      <input
        @input="handleSearch"
        :disabled="loading || error"
        type="text"
        class="form-control col-10 col-sm-6 col-lg-4"
        placeholder="You can search here"
      />
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "TodoInput",
  data: function() {
    return {
      todoText: "",
      searchText: "",
    };
  },
  computed: {
    ...mapGetters("todo", ["loading", "error"]),
  },
  methods: {
    ...mapActions("todo", ["addTodo", "searchTodo"]),
    showAlert() {
      this.$swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    handleAdd() {
      this.addTodo({
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
