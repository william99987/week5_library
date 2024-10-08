import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import store from '@/store/store'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import AddBookView from '@/views/AddBookView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import AddCloudBookView from '@/views/AddCloudBookView.vue'
import WeatherView from '@/views/WeatherView.vue'
import BookCountAPI from '@/views/BookCountAPI.vue'
import GetAllBookAPI from '@/views/GetAllBookAPI.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/FireLogin',
    name:'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireSignup',
    name: 'FireSignup',
    component: FirebaseRegisterView
  },
  {
    path: '/AddBook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path: '/AddCloudBook',
    name: 'AddCloudBook',
    component: AddCloudBookView
  },
  {
    path: '/Weather',
    name: 'Weather',
    component: WeatherView
  },
  {
    path: '/BookCountAPI',
    name: 'BookCountAPI',
    component: BookCountAPI
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if(!store.state.isAuthenticated && to.name != 'Login' && 
    to.name != 'FireLogin' && to.name != 'FireSignup' 
    && to.name != 'AddBook' && to.name != 'GetBookCount' 
    && to.name != 'AddCloudBook' && to.name != 'Weather'
    && to.name != 'BookCountAPI' && to.name !='GetAllBookAPI')
  {
    alert("please log in first")
     next({name:'Login'});
  }
  else{
    next();
  }
});

export default router