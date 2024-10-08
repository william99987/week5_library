<template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model= "email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Save to Firebase </button></p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import {useRouter} from "vue-router"
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const db = getFirestore();
const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()
const register = async () => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    console.log('Firebase Register successful!');

    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: 'user' // Assign a default role to new users
    });

    router.push('/');
  } catch (error) {
    console.log(error.code);
  }
};
</script>