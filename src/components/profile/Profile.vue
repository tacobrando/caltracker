<template>
    <div class="profile">
        <v-card>
            <div class="container">
                <div class="title">
                    <v-avatar class="avatar" size="80">
                        <img src="https://randomuser.me/api/portraits/men/81.jpg">
                    </v-avatar>
                </div>
                <div class="user">
                    <h2>{{ user.username }}</h2>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'Profile',
    data(){
        return{
            profile: null,
            newComment: null,
            feedback: null,
            user: [],
        }
    },
    created(){
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
  }
}
</script>

<style lang="scss" scoped>
.profile .container{
    display: flex;
    align-items: center;
    padding: 15px;
}
.user{
    margin: 20px;
}



</style>