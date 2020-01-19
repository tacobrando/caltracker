<template>
  <div class="navbar">
    <v-app-bar v-if="user" :color="color" max-height="50px" fixed>
        <v-app-bar-nav-icon class="nav-icon" color="white" @click.stop="drawer = !drawer" />
          <v-toolbar-title class="white-text" v-if="this.$route.name == 'Profile'">Profile</v-toolbar-title>
          <v-toolbar-title class="white-text" v-if="this.$route.name == 'Home'">Home</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer 
    absolute
    temporary
    v-model="drawer" app>
      <div class="background">
        <div class="user-info">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-avatar size="110" >
                <img class="avatar" src="https://randomuser.me/api/portraits/men/81.jpg">
              </v-list-item-avatar>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title v-if="user" class="user white-text">
                {{ user.username }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title v-if="user" class="email white-text">
                {{ email }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>{{ this.items[0].icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ this.items[0].title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>{{ this.items[1].icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ this.items[1].title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <ul></ul>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'Navbar',
  data(){
    return{
      user: null,
      color: '#F46F6F',
      drawer: false,
      email: null,
      items: [
        { title: 'About', icon: "mdi-help-circle-outline" },
        { title: 'Log out', icon: "mdi-logout" }
      ]
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
        this.email = user.email
        let ref = db.collection('users')
    // get current user
        ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.user = doc.data(),
            this.user.id = doc.id
            this.user.username = this.user.username.charAt(0).toUpperCase() + this.user.username.slice(1)
          })
        })
      } else {
        this.user = null
      }
    })
  }

}
</script>

<style lang="scss" scoped>
.white-text{
  color: white;
}
.user-info{
  text-align: center;
  background-color: #F46F6F;
}
.user-info .user{
  font-size: 2.4em;
  font-weight: 1000
}
.avatar{
  border: 3px solid white;
}
</style>


