<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h3 class="mb-4">Register</h3>
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!isSuccessful">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="user.username"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="username"
            />
            <div
              v-if="isSubmitted && errors.has('username')"
              class="alert-danger"
            >
              {{ errors.first("username") }}
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              v-validate="'required|min:6|max:40'"
              type="password"
              class="form-control"
              name="password"
            />
            <div
              v-if="isSubmitted && errors.has('password')"
              class="alert-danger"
            >
              {{ errors.first("password") }}
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Sign Up</button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="isSuccessful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      isSubmitted: false,
      isSuccessful: false,
      message: "",
    };
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.isSubmitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          this.$store.dispatch("user/register", this.user).then(
            (data) => {
              this.message = data.message;
              this.isSuccessful = true;
              this.$router.push("/login");
            },
            (error) => {
              this.message =
                (error.response && error.response.data.message) ||
                error.message ||
                error.toString();
              this.isSuccessful = false;
            }
          );
        }
      });
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
