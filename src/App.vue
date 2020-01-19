<template>
  <v-app :style="color">
  <Navbar />
  <router-view />
    <v-content>
    </v-content>
    <BottomBar />
  </v-app>
</template>

<script>
import Navbar from './components/layout/Navbar';
import BottomBar from './components/layout/BottomBar';
import Fab from './components/layout/Fab'

import firebase from 'firebase'

export default {
  name: 'App',

  components: {
    Navbar,
    BottomBar,
    Fab
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
}
</style>
