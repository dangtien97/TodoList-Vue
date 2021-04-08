<template>
  <div v-if="error.has(fieldName)" class="alert alert-danger" role="alert">
    {{ this.getValidationsErrors(error, fieldName) }}
  </div>
</template>

<script>
import errorMixins from "@/mixins/errorMixins";
export default {
  props: {
    fieldName: String,
    error: {},
  },
  mixins: [errorMixins],
};
</script>

<style></style>
