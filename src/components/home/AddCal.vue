<template>
  <div class="add-cal">
      <v-card>
          <div class="container">
              <v-spacer></v-spacer>
            <div class="title">
                <v-card-title>{{ this.meal }}</v-card-title>
            </div>
            <v-spacer></v-spacer>
            <div class="btn-container" >
                <v-btn icon @click="dialog = true">
                    <v-icon>
                        mdi-plus-circle-outline
                    </v-icon>
                </v-btn>
            </div>
          </div>
      </v-card>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card>
        <v-toolbar flat max-height="55px" dark color="#F46F6F">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Add {{ this.meal }}</v-toolbar-title>
        </v-toolbar>
          <div class="search-bar">
              <v-text-field label="Search for food....." v-model="search" @keyup.enter="getFood"/>
          </div>
          <div class="list">
            <ul class="items">
                <li @click="addFood(food.food.label, food.food.nutrients.ENERC_KCAL), dialog = false" v-for="(food, i) in foods" :key="i" class="food-list">
                    <span>{{ ellipsify(food.food.label) }}</span>
                    <span>{{ Math.round(food.food.nutrients.ENERC_KCAL) }} kcal</span>
                </li>
            </ul>
          </div>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import db from '@/firebase/init'
import firebase from 'firebase'


export default {
    name: 'AddCal',
    props: ['meal'],
    data(){
        return{
            info: null,
            kcal: null,
            dialog: false,
            search: '',
            foods: [],
            user: []
        }
    },
    methods:{
        getFood(){
            let appKey = "8d9f344d9eba7a39027545d7e41169e9"
            let appId = "4705f5ec"
            let search = this.search.split(' ').join('%20')
            let url = `https://api.edamam.com/api/food-database/parser?ingr=${search}&app_id=${appId}&app_key=${appKey}`
            axios.get(url).then(res =>{
                this.foods = res.data.hints
                console.log(this.foods)
            })
        },
        ellipsify(str){
            if (str.length > 25) {
                return (str.substring(0, 25) + "...");
            }
            else {
                return str;
            }
        },
        addFood(food, cal){
            db.collection('users').doc(this.user.id).collection('diary').add({
                food: food,
                kcal: Math.round(cal),
                user_id: this.user.user_id,
                meal: this.meal,
                timestamp: Date.now()
            }).catch(err => {
                console.log(err)
            })
        },
    },
    mounted(){
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
  },
}
</script>

<style lang="scss" scoped>
.add-cal{
    position: relative;
}
.add-cal .container{
    display: flex;
    justify-content: center;
    padding: 0px;
}
.btn-container{
    margin-top: 15px;
}
ul {
  list-style-type: none;
}
.search-bar{
    margin: 10px
}
.food-list{
    display: flex;
    justify-content: space-between;
    border: 1px solid rgb(207, 207, 207);
    padding: 10px;
    border-radius: 5px;
    margin: 1px
}
.food-list:active{
    background-color: rgb(207, 207, 207)
}
.list {
    padding-right: 10px;
}
.items{
    max-height: 400px;
    overflow: auto
}
.items::-webkit-scrollbar{
    width: 3px;
}
.items::-webkit-scrollbar-thumb{
    background: #aaa
}
.btn{
    display: flex;
    justify-content: space-between;
}
</style>