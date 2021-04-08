export default {
  methods: {
    getValidationsErrors: function(errors, fieldName) {
      if (Array.isArray(errors.collect(fieldName)))
        return errors.collect(fieldName).join(". ");
      else return errors.first(fieldName);
    },
  },
};
