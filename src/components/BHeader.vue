<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home (Week 5)</router-link
          >
          <router-link  to="/about" class="nav-link" active-class="active">About</router-link>

          <router-link v-if="!isAuthenticated" to="/Login" class="nav-link" active-class="active" aria-current="page"
            >Login</router-link
          >
          <router-link to="/FireSignup" class="nav-link" active-class="active">Firebase Signup</router-link>

          <router-link to="/AddBook" class="nav-link" active-class="active">Add book</router-link>

          <router-link to="/GetBookCount" class="nav-link" active-class="active">Get book count</router-link>

          <router-link to="/AddCloudBook" class="nav-link" active-class="active">Add cloud Books</router-link>

          <router-link to="/Weather" class="nav-link" active-class="active">Weather</router-link>

          <router-link to="/BookCountAPI" class="nav-link" active-class="active">Count Book Api</router-link>
          
          <router-link to="/GetAllBookAPI" class="nav-link" active-class="active">Get all book api</router-link>

          <router-link  v-if= "!isAuthenticated" to="/FireLogin" class="nav-link" active-class="active">Firebase Login</router-link>

          <button v-else @click="handleLogout" class="nav-link btn btn-link">Logout</button>
      </ul>
    </header>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/store/store';
export default {
  setup() {
    const router = useRouter(); // Use Vue Router hook for navigation

    // Make sure store is correctly accessed and state is reactive
    const isAuthenticated = computed(() => store.state.isAuthenticated);

    const handleLogout = () => {
      store.dispatch('logout'); 
      router.push({ name: 'Login' }); 
    };

    return {
      isAuthenticated,
      handleLogout,
    };
  },
};
</script>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>
