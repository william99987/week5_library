<template>
    <h1>Add Book</h1>
    <form @submit.prevent="addCloudBook">
    <p><input type="number" placeholder="Isbn" v-model="isbn" required/></p>
    <p><input type="text" placeholder="Name" v-model="name" required/></p>
    <p><button type="submit">Add book</button></p>
    </form>
    <BookList />
    <UpdateBookView />
    <DeleteBookView />
</template>

<script setup>
import { ref } from "vue";
import BookList from "./BookList.vue";
import UpdateBookView from "./UpdateBookView.vue";
import DeleteBookView from "./DeleteBookView.vue";
import axios from "axios";

const isbn = ref("")
const name = ref("")

const addCloudBook = async() => {
    try{
        const isbnNumber = Number(isbn.value);
        const response = await axios.post("https://addbooks-stakcmofha-uc.a.run.app",{
            isbn: isbnNumber,
            name: name.value.toUpperCase()
        });
        console.log("Book add successfully", response.data)
        isbn.value = ""
        name.value = ""
    }
    catch(error)
    {
        console.log("Error adding Book:", error);
    }
}
</script>