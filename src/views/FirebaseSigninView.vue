<template>
    <h1>Sign in</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="signin">Sign in via Firebase</button></p>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  import store from "@/store/store";
  import { doc, getDoc } from "firebase/firestore";
  import db from "@/firebase/init";
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  const auth = getAuth();
  
  const signin = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((data) => {
        const user = auth.currentUser;
        if(user) {
            const userDocRef = doc(db, "users", user.uid);
            getDoc(userDocRef)
            .then((userDoc) => {
            const userData = userDoc.data();
            console.log("Firebase Sign-In Successful!");
            if(userData.role === 'admin') {
                console.log("User is an admin")
            }
            else if(userData.role === 'user') {
                console.log('User is a regular user')
            }})
        }
        store.commit('setAuthentication', true)
        router.push("/");
        console.log(auth.currentUser); // To check the current user signed in
      })
      .catch((error) => {
        console.log(error.code);
      });
  };
  </script>
  