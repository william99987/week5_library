<template>
    <div>
    <h1>Delete book</h1>
    <p><input type="text" placeholder="BookId" v-model="formData.id"> </p>
    <p><button @click="DeleteBookList">Delete booklist</button></p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { doc, deleteDoc}  from "firebase/firestore"
import db from '@/firebase/init';

const formData = ref({
    id: '',
    name: '',
    isbn: null
})

const DeleteBookList = async() =>{
    const bookDocRef = doc(db, "books", formData.value.id);
    try{
        await deleteDoc(bookDocRef)
        console.log("delete success!")
    }
    catch(error){
        console.error("error:", error)
    }
}
</script>