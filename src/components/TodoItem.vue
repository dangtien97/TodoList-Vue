<template>
  <div class="row my-4 justify-content-center align-items-center">
    <input
      type="checkbox"
      @click="selectTodosToDelete([todo.id])"
      :checked="getDeletingTodos.includes(todo.id)"
    />
    <div class="col-7 col-lg-4 item mx-2">
      <div
        v-if="!isSelectedToEdit(todo)"
        class="row justify-content-between align-items-center title"
        :class="todo.status === 'completed' ? 'completed' : ''"
        :title="'Created: ' + created + '\nUpdated: ' + todo.updated_at"
      >
        <span class="content">
          {{ todo.content }}
        </span>
        <input
          type="checkbox"
          @click="handleStatus(todo)"
          :checked="todo.status === 'completed'"
        />
      </div>
      <input v-else type="text" class="form-control" v-model="editText" />
    </div>
    <button
      @click="handleEdit(todo)"
      class="btn btn-success"
      :disabled="
        todo.status === 'completed' || (isSelectedToEdit(todo) && !editText)
      "
    >
      {{ isSelectedToEdit(todo) ? "Update" : "Edit" }}
    </button>
    <button @click="handleDelete(todo)" class="btn btn-danger ml-1">
      {{ isSelectedToEdit(todo) ? "Cancel" : " Delete" }}
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
      editText: this.todo.content,
      created: this.todo.created_at,
    };
  },
  computed: {
    ...mapGetters("todo", ["getEditingTodo", "getDeletingTodos"]),
  },
  methods: {
    ...mapActions("todo", [
      "deleteTodo",
      "updateTodo",
      "selectTodoToEdit",
      "selectTodosToDelete",
    ]),
    isSelectedToEdit(todo) {
      return todo.id === this.getEditingTodo;
    },
    handleEdit(todo) {
      if (this.isSelectedToEdit(todo)) {
        // update
        this.updateTodo({
          id: todo.id,
          content: this.editText,
          status: "active",
        });
        this.selectTodoToEdit(null);
      } else {
        // select todo to edit
        this.selectTodoToEdit(todo.id);
        this.editText = this.todo.content;
      }
    },
    handleStatus(todo) {
      this.updateTodo({
        id: todo.id,
        content: todo.content,
        status: todo.status === "active" ? "completed" : "active",
      });
    },
    handleDelete(todo) {
      if (this.isSelectedToEdit(todo)) {
        // cancel edit
        // this.isSelectedToEdit(todo) = false;
        this.editText = this.todo.content;
        this.selectTodoToEdit(null);
      } else {
        // delete
        this.$swal
          .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              this.deleteTodo([todo.id]);
            }
          });
      }
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
.content {
  max-width: 70%;
}
.row {
  margin-left: 0;
  margin-right: 0;
}
</style>
