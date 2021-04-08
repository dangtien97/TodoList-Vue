<template>
  <div v-if="error.has(fieldName)" class="alert alert-danger" role="alert">
    {{ this.getValidationsErrors(error, fieldName) }}
  </div>
</template>

<script>
import ErrorMixins from "@/mixins/ErrorMixins";
export default {
  props: {
    fieldName: String,
    error: {},
  },
  mixins: [ErrorMixins],
};
</script>

<style></style>
