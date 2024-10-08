<script setup>
import JSONLab from './components/JSONLab.vue'
import BHeader from './components/BHeader.vue'
import BookCountAPI from './views/BookCountAPI.vue';
import GetAllBookAPI from './views/GetAllBookAPI.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
//import LibraryRegistrationForm from './views/HomeView.vue'
const showHeader = computed(() => {
  return route.name !== 'BookCountAPI' && route.name !== 'GetAllBookAPI';
})
</script>

<template>
  <div class="main-container">
    <header v-if="showHeader">
      <BHeader />
    </header>

    <main>
      <!-- <LibraryRegistrationForm /> -->
      <!-- <JSONLab /> -->
      <router-view></router-view>
    </main>
</div>
</template>

<style scoped>
/* header {
  line-height: 1.5;
} */
</style>
