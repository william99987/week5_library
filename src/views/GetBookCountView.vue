<template>
<div id="app">
    <h1>Book Counter</h1>
    <button @click="getBookCount"> Get Book Count</button>
    <p v-if="count !== null">Total number of books: {{ count }}</p>
    <p v-if="error">{{ error }}</p>
</div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const count = ref(null);
const error = ref(null);

const getBookCount = async() =>
{
    try{
        const response = await axios.get("https://countbooks-stakcmofha-uc.a.run.app");
        count.value = response.data.count;
        error.value = null;
    } catch (error) {
        console.error('Error fetching book count:', error);
        error.value = error;
        count.value = null;
    }
}
</script>