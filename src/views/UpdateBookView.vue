<template>
    <div>
    <h1>Update book</h1>
    <p><input type="text" placeholder="BookId" v-model="formData.id"> </p>
    <p><input type="text" placeholder="New bookname" v-model="formData.name"> </p>
    <p><input type="number" placeholder="New Isbn" v-model.number="formData.isbn"> </p>
    <p><button @click="updateBookList">Update booklist</button></p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { doc, updateDoc}  from "firebase/firestore"
import db from '@/firebase/init';

const formData = ref({
    id: '',
    name: '',
    isbn: null
})

const updateBookList = async() =>{
    const bookDocRef = doc(db, "books", formData.value.id);
    try{
        await updateDoc(bookDocRef, {name: formData.value.name, isbn: formData.value.isbn})
        console.log("update success!")
    }
    catch(error){
        console.error("error:", error)
    }
}
</script>