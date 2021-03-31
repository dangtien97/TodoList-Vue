<template>
  <div>
    <form class="form-inline justify-content-center mb-4">
      <input
        @change="handleChange"
        :value="todoText"
        :disabled="loading || error"
        type="text"
        class="form-control col-4 mx-3"
        placeholder="Todo"
      />
      <button
        @click.prevent="handleAdd"
        class="btn btn-primary col-1"
        :disabled="loading || error"
      >
        Add Todo
      </button>
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
    };
  },
  computed: {
    ...mapGetters("todo", ["loading", "error"]),
  },
  methods: {
    ...mapActions("todo", ["addTodo"]),
    handleChange(e) {
      this.todoText = e.target.value;
    },
    handleAdd() {
      this.addTodo({
        content: this.todoText,
      });
      this.todoText = "";
    },
  },
};
</script>

<style scoped></style>
