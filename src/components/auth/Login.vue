<template>
    <div class="login container">
        <v-form>
            <div class="caltracker-logo">
                <v-img src="@/assets/logo.png" />
            </div>
            <h2>CalTracker</h2>
            <div class="field">
                <v-text-field 
                outlined 
                background-color="white" 
                placeholder="Email" 
                v-model="email" />
            </div>
            <div class="field">
                <v-text-field 
                outlined 
                background-color="white" 
                placeholder="Password" 
                type="password"
                v-model="password"
                @keyup.enter="login" />
            </div>
            <p v-if="feedback" class="red-text">{{ feedback }}</p>
            <div class="login-btn">
                <v-btn 
                block
                @click="login"
                color="primary">Login</v-btn>
            </div>
            <div class="signup-link">
                <router-link 
                style="text-decoration: none;" 
                :to="{ name: 'Signup' }"><v-btn block>Don't have an account?</v-btn></router-link>
            </div>
        </v-form>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {    
    name: 'Login',
    data(){
        return{
            email: null,
            password: null,
            feedback: null,
        }
    },
    methods: {
        login(){
            if(this.email && this.password){
                this.feedback = null
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    this.$router.push({ name: 'Home'})
                }).catch(err => {
                    this.feedback = err.message
                })
            } else {
                this.feedback = "Please fill in both fields"
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.login{
    display: flex;
    justify-content: center;
}
.login h2{
    font-size: 3.4em;
}
.caltracker-logo{
    max-width: 250px;
}
.login-btn{
    display: flex;
    justify-content: center;
}
.signup-link{
    margin-top: 16px;
    text-align: center
}
.field{
    height: 70px;;
}
.red-text{
    color: red;
    max-width: 250px
}

</style>