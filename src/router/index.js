import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import Login from '@/components/auth/Login.vue'
import Signup from '@/components/auth/Signup.vue'
import Home from '@/components/home/Home.vue'
import Profile from '@/components/profile/Profile.vue'
import PageDoesNotExist from '@/components/errors/PageDoesNotExist.vue'
import About from '@/components/about/About.vue'


Vue.use(VueRouter)

const routes = [
  {
  path: '/',
  name: 'Home',
  component: Home,
  meta: {
    requiresAuth: true
    },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      requiresAuth: true
      },
    },
  {
  path: '/profile',
  name: 'Profile',
  component: Profile,
  meta: {
    requiresAuth: true
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '*',
    name:'PageDoesNotExist', 
    component: PageDoesNotExist
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // check if route requires auth
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    let user = firebase.auth().currentUser
    if(user){
      // user signed in, proceed to route
      next()
    } else {
      // no user signed in redirect to login
      next({ name: 'Login' })
    }
  } else{
    next()
  }
})

export default router
