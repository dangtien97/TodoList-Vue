<template>
  <div v-if="error.has(fieldName)" class="alert alert-danger" role="alert">
    {{ this.getValidationsErrors(error, fieldName) }}
  </div>
</template>

<script>
import ErrorMixin from "@/mixins/ErrorMixin";
export default {
  props: {
    fieldName: String,
    error: {},
  },
  mixins: [ErrorMixin],
};
</script>

<style></style>
