<template>
  <v-app :style="color">
  <Navbar />
  <vue-page-transition name="fade">
  <router-view />
  </vue-page-transition>
    <v-content>
    </v-content>
    <BottomBar />
  </v-app>
</template>

<script>
import Navbar from './components/layout/Navbar';
import BottomBar from './components/layout/BottomBar';

import firebase from 'firebase'

export default {
  name: 'App',

  components: {
    Navbar,
    BottomBar,
  },

  data(){
    return {
      color: 'background-color: #F46F6F;',
      user: null,
    }
  },
  created(){
    // let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.user = user
        this.color = 'background-color: #DDDADA;'
      } else {
        this.user = null
        this.color = 'background-color: #F46F6F;'
      }
    })
  }
}
</script>

<style>
#app{
  color: white;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
