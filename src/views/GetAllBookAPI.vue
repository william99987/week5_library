<template>
    <div id="app">
        <!-- <h1>Book Counter</h1> -->
        <!-- <button @click="getBookCount"> Get Book Count</button>
        <p v-if="count !== null">Total number of books: {{ count }}</p>
        <p v-if="error">{{ error }}</p> -->
        <pre> {{ jsondata }}</pre>
    </div>
    </template>
    
    <script setup>
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    
    const jsondata = ref(null);
    const books = ref(null);
    const error = ref(null);
    
    const getBookCount = async() =>
    {
        try{
            const response = await axios.get("https://getbooks-stakcmofha-uc.a.run.app");
            books.value = response.data;
            jsondata.value = response.data;
            error.value = null;
        } catch (error) {
            console.error('Error fetching book count:', error);
            error.value = error;
            books.value = null;
            jsondata.value = null;
        }
    }
    
    onMounted(getBookCount);
    </script>