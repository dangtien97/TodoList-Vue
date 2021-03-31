<template>
  <div class="row my-4 justify-content-center align-items-center">
    <div class="col-4 item mx-2">
      <div
        v-if="!editing"
        class="row justify-content-between align-items-center title"
        :class="todo.status === 'completed' ? 'completed' : ''"
      >
        <span> {{ todo.content }} </span>
        <input
          type="checkbox"
          @click="handleStatus(todo)"
          :checked="todo.status === 'completed'"
          :disabled="loading || error"
        />
      </div>
      <input v-else type="text" class="form-control" v-model="editText" />
    </div>
    <button
      @click="handleEdit(todo)"
      class="btn btn-success"
      :disabled="todo.status === 'completed' || loading || error"
    >
      {{ editing ? "Update" : "Edit" }}
    </button>
    <button
      @click="deleteTodo(todo.id)"
      class="btn btn-danger ml-1"
      :disabled="loading || error"
    >
      Delete
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TodoItem",
  props: {
    todo: {},
  },
  data: function() {
    return {
      editText: "",
      editing: false,
    };
  },
  computed: {
    ...mapGetters("todo", ["allTodos", "loading", "error"]),
  },
  methods: {
    ...mapActions("todo", ["deleteTodo", "updateTodo", "statusTodo"]),
    handleEdit(todo) {
      if (this.editing) {
        if (this.editText) {
          this.updateTodo({
            id: todo.id,
            content: this.editText,
            status: "active",
          });
        } else {
          this.deleteTodo(todo.id);
        }
      } else {
        this.editText = todo.title;
      }
      this.editing = !this.editing;
    },
    handleStatus(todo) {
      this.statusTodo({
        id: todo.id,
        content: todo.content,
        status: todo.status === "active" ? "completed" : "active",
      });
    },
  },
};
</script>

<style scoped>
.item {
  background-color: rgba(128, 128, 128, 0.123);
  padding: 7px 30px;
  border-radius: 15px;
  font-size: 20px;
}
.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.completed {
  text-decoration: line-through;
  color: grey;
}
</style>
