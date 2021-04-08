<template>
  <layout-default>
    <div class="card card-container">
      <h3 class="mb-4">Register</h3>
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleRegister">
        <div>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="user.username"
              v-validate.continues="'alpha_num|min:3|max:20'"
              type="text"
              class="form-control"
              name="username"
            />
            <error-validation fieldName="username" :error="errors" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              v-validate.continues="'min:6|max:40'"
              type="password"
              class="form-control"
              name="password"
            />
            <error-validation fieldName="password" :error="errors" />
          </div>
          <div class="form-group">
            <button
              class="btn btn-primary btn-block"
              :disabled="errors.has('username') || errors.has('password')"
            >
              <span
                v-show="isLoading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span> Sign Up </span>
            </button>
          </div>
        </div>
      </form>
      <div v-if="getError" role="alert" class="alert alert-danger">
        {{ getError }}
      </div>
    </div>
  </layout-default>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ErrorValidation from "@/components/ErrorValidation.vue";
import LayoutDefault from "@/layout/LayoutDefault.vue";
export default {
  components: { LayoutDefault, ErrorValidation },
  name: "Register",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters("loader", ["isLoading", "getError"]),
  },
  methods: {
    ...mapActions("user", ["register"]),
    ...mapActions("loader", ["removeError", "setError"]),

    async handleRegister() {
      const isValid = await this.$validator.validate();
      if (isValid) {
        await this.register(this.user);
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
label {
  text-align: start;
  font-weight: bold;
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #e08f8f44;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
