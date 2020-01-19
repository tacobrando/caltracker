import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/auth/Login.vue'
import Signup from '@/components/auth/Signup.vue'
import Home from '@/components/home/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
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
  } else {
    next()
  }
})

export default router
