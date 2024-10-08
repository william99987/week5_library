<template>
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
    <p><input type="isbn" placeholder="Isbn" v-model="isbn" required/></p>
    <p><input type="name" placeholder="Name" v-model="name" required/></p>
    <p><button type="submit">Add book</button></p>
    </form>
    <BookList />
    <UpdateBookView />
    <DeleteBookView />
</template>

<script setup>
import { ref } from "vue";
import db from '../firebase/init.js'
import { collection, addDoc } from "firebase/firestore";
import BookList from "./BookList.vue";
import UpdateBookView from "./UpdateBookView.vue";
import DeleteBookView from "./DeleteBookView.vue";

const isbn = ref("")
const name = ref("")

const addBook = async () => {
    try{
        const isbnNumber = Number(isbn.value)
        if (isNaN(isbnNumber)){
            alert('ISBN must be a valid number');
            return;
        }

        await addDoc(collection(db, 'books'), {
            isbn: isbnNumber,
            name: name.value
        });
        isbn.value = '';
        name.value = '';
        alert('Book added successfuly!');
    } catch (error) {
        console.error('Error adding book: '.error);
    }
};


</script>