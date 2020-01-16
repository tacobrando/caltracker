<template>
    <div class="bottom-nav">
        <v-bottom-navigation
            v-model="bottomNav"
            v-if="user"
            fixed
            backgroundColor="#F46F6F"
            color="white"
        >
        
            <v-btn 
            to="/"
            value="home">
            <span>Home</span>
            <v-icon>mdi-home</v-icon>
            </v-btn>
                    
        <v-btn
        large
        @click="overlay = !overlay"
        color="#3BB1E5">
            <v-icon class="icon-white">mdi-camera</v-icon>
        </v-btn>

        <v-btn
        to="/profile/"
        value="profile">
            <span>Profile</span>
            <v-icon>mdi-account</v-icon>
        </v-btn>
        </v-bottom-navigation>
        <v-overlay
        :value="overlay">
            <v-btn @click="overlay = false"><v-icon>mdi-close</v-icon></v-btn>
            <qrcode-stream ></qrcode-stream>
        </v-overlay>

    </div>
</template>

<script>
import firebase from 'firebase'
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'


  export default {
    name: 'BottomBar',
    components: {
        QrcodeStream,
        QrcodeDropZone,
        QrcodeCapture
    },
    data() {
      return{
        bottomNav: 'recent',
        user: null,
        home: true,
        profile: null,
        overlay: false
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

<style lang="scss" scoped>
.bottom-nav{
    display: flex;
    align-content: space-around
}

</style>