<template>
  <div v-if="error.has(fieldName)" class="alert alert-danger" role="alert">
    {{ this.getValidationsErrors(error, fieldName) }}
  </div>
</template>

<script>
import ErrorsMixins from "@/mixins/ErrorsMixins";
export default {
  props: {
    fieldName: String,
    error: {},
  },
  mixins: [ErrorsMixins],
};
</script>

<style></style>
