<template>
  <div class="navbar">
    <v-app-bar v-if="user" :color="color" fixed>
        <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />
          <h2 class="white-text">{{ title }} </h2>
          <v-btn @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <div class="background">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg">
            </v-list-item-avatar>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Username
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Navbar',
  data(){
    return{
      user: null,
      color: '#F46F6F',
      title: 'Home',
      drawer: false
    }
  },
  methods: {
    logout(){
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Login' })
      })
    }
  },
  created(){
    // let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.user = user
      } else {
        this.user = null
      }
    })
  }

}
</script>

<style>
.white-text{
  color: white;
}
.background{
  color: '#F46F6F';
  height: 300px;
}

</style>


