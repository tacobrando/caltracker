<template>
    <div class="signup">
        <v-card outlined raised>
            <v-form>
                <h2>Sign up</h2> 
                <div class="field">
                    <v-text-field placeholder="Username" v-model="username" />
                </div>
                <div class="field">
                    <v-text-field placeholder="Email" v-model="email" />
                </div>
                <div class="field">
                    <v-text-field 
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
                    type="password" 
                    placeholder="Password" 
                    :type="show1 ? 'text' : 'password'"
                    counter
                    @click:append="show1 = !show1"
                    v-model="password"
                    @submit.prevent="signup" />
                </div>
                <p v-if="feedback">{{ feedback }}</p>
                <div class="field">
                    <v-btn 
                    min-width="250" 
                    color="primary"
                    @click="signup">Sign up</v-btn>
                </div>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'Signup',
    data(){
        return{
            show1: false,
            username: null,
            email: null,
            password: null,
            feedback: null,
            slug: null,
        }
    },
    methods: {
        signup(){
            if(this.username && this.email && this.password){
                this.slug = slugify(this.username, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true 
                })
                let ref = db.collection('users').doc(this.slug)
                ref.get().then(doc => {
                    if(doc.exists){
                        this.feedback = "This Username already exists"
                    } else {
                        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                        .then(cred => {
                            ref.set({
                                username: this.username,
                                user_id: cred.user.uid
                            })
                        }).then(() => {
                            this.$router.push({ name: 'Home'})
                        })
                        .catch(err => {
                            console.log(err)
                            this.feedback = err.message
                        })
                        this.feedback = 'This Username is free to use'
                    }
                })
            } else {
                this.feedback = "You must fill out all fields"
            }
        }
    }
}
</script>

<style>
.signup{
    padding: 20px;
}
.signup .field{
    padding: 20px;
    height: auto;
    width: auto;
    display: flex;
    justify-content: center
}
.signup h2{
    margin-top: 16px;
    text-align: center;
    font-size: 2.4em;
}
.signup p{
    text-align: center;
    color: red
}



</style>