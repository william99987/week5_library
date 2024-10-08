<script>
import { ref } from 'vue'
import { mapActions } from 'vuex';



export default {
    data() {
    return {
      username: '',
      password: '',
      errors: { // Initialize errors directly in data()
        username: null,
        password: null,
        login: null
      }
    };
  },
    methods: {
        ...mapActions(['login']),
        handleLogin(){
            const user = {username: this.username, password: this.password};
            this.login(user).then(success => {
        if (success) {
          this.$router.push({ name: 'Home' });
        } else {
            this.errors.login = 'Invalid username or password.'; // 
        }
      });
        },

    },
};

</script>

<template>
  <!-- 🗄️ W3. Library Registration Form -->
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">Log in to Embrace</h1>
        <p class="text-center">
          Let's build some more advanced feature into our form.
        </p>
        <form @submit.prevent="handleLogin">
          <div class="row mb-3 justify-content-center">
            <div class="col-md-8">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model= "username"
              />
            </div>
          </div>
          <div class="row mb-3 justify-content-center">
            <div class="col-md-8">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model= "password" 
              />
            </div>
            <div v-if="errors && errors.login" class="text-danger">{{ errors.login }}</div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  /* background-color: #e0bfbf; */
  /* border-radius: 10px;
} */ 

/* Class selectors */
.form {
  text-align: center;
  margin-top: 50px;
}

/* ID selectors */
#username:focus,
#password:focus,
#isAustralian:focus,
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}

.success-message {
  color: green;
}
</style>
