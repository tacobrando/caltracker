<template>
    <div class="home">
        <div class="card">
            <RadialCard :total="total" />
        </div>
        <div>
            <AddCal @clicked="editBtn" class="meal" :diary="diary" meal="Breakfast" />
            <ul v-for="(item, i) in diary" :key="i">
                <li class="food-list" v-if="item.meal == 'Breakfast' && item.user_id == user.user_id">
                    <div class="group">
                        <v-icon v-if="edit" @click="deleteFood(item,i)" class="delete-btn">mdi-minus-circle</v-icon>
                        <span class="black-text">{{ item.food }}</span>
                    </div>
                    <span class="black-text">{{ item.kcal }}</span>
                </li>
            </ul>
            <div class="total" v-if="breakfast">
                <span class="black-text bold">Total:</span>
                <span class="black-text bold">{{ breakfast }}</span>
            </div>
        </div>
        <div>
            <AddCal @clicked="editBtn" class="meal" :diary="diary" meal="Lunch" />
            <ul v-for="(item, i) in diary" :key="i">
                <li class="food-list" v-if="item.meal == 'Lunch' && item.user_id == user.user_id">
                    <div class="group">
                        <v-icon v-if="edit" @click="deleteFood(item,i)" class="delete-btn">mdi-minus-circle</v-icon>
                        <span class="black-text">{{ item.food }}</span>
                    </div>
                    <span class="black-text">{{ item.kcal }}</span>
                </li>
            </ul>
            <div class="total" v-if="lunch">
                <span class="black-text bold">Total:</span>
                <span class="black-text bold">{{ lunch }}</span>
            </div>
        </div>
        <div>
            <AddCal @clicked="editBtn" class="meal" :diary="diary" meal="Dinner" />
            <ul v-for="(item, i) in diary" :key="i">
                <li class="food-list" v-if="item.meal == 'Dinner' && item.user_id == user.user_id">
                    <div class="group">
                        <v-icon v-if="edit" @click="deleteFood(item,i)" class="delete-btn">mdi-minus-circle</v-icon>
                        <span class="black-text">{{ item.food }}</span>
                    </div>
                    <span class="black-text">{{ item.kcal }}</span>
                </li>
            </ul>
            <div class="total" v-if="dinner">
                <span class="black-text bold">Total:</span>
                <span class="black-text bold">{{ dinner }}</span>
            </div>
        </div>
        <div>
            <AddCal @clicked="editBtn" class="meal" :diary="diary" meal="Other..." />
            <ul v-for="(item, i) in diary" :key="i">
                <li class="food-list" v-if="item.meal == 'Other...' && item.user_id == user.user_id">
                    <div class="group">
                        <v-icon v-if="edit" @click="deleteFood(item,i)" class="delete-btn">mdi-minus-circle</v-icon>
                        <span class="black-text">{{ item.food }}</span>
                    </div>
                    <span class="black-text">{{ item.kcal }}</span>
                </li>
            </ul>
            <div class="total" v-if="other">
                <span class="black-text bold">Total:</span>
                <span class="black-text bold">{{ other }}</span>
            </div> 
        </div>
    </div>
</template>

<script>
import RadialCard from '../radial/RadialCard'
import AddCal from './AddCal'
import moment from 'moment'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'Home',
    components: {
        RadialCard,
        AddCal,

    },
    data(){
        return{
            diary: [],
            total: 0,
            breakfast: 0,
            lunch: 0,
            dinner: 0,
            other: 0,
            user: [],
            edit: false,
        }
    },
    methods: {
        editBtn(){
            switch (this.edit) {
                case true:
                    this.edit = false
                    break
                case false:
                    this.edit = true
                    break
            }
        },
        ellipsify(str){
            if (str.length > 25) {
                return (str.substring(0, 25) + "...");
            }
            else {
                return str;
            }
        },
        deleteFood(item, index){
            db.collection('users').doc(this.user.id).collection('diary').doc(this.diary[index].id).delete()
            this.diary.splice(index, 1)
        },
        updates(){
            let ref = db.collection('users').doc(this.user.id).collection('diary').orderBy('timestamp')
            ref.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type == 'added'){
                        let doc = change.doc.data()
                        this.diary.push({
                            food: doc.food,
                            kcal: doc.kcal,
                            meal: doc.meal,
                            timestamp: doc.timestamp,
                            user_id: doc.user_id,
                            id: change.doc.id
                        })
                        this.uid = doc.user_id
                        this.total = 0
                        this.breakfast = 0
                        this.lunch = 0
                        this.dinner = 0
                        this.other = 0
                        this.addTotal()
                    }
                })
            })
        },
    addTotal(){
            this.diary.forEach(doc => {
                if(doc.user_id == this.user.user_id){
                    this.total += doc.kcal
                }
                if(doc.meal == 'Breakfast' && doc.user_id == this.user.user_id){
                    this.breakfast += doc.kcal
                }else if(doc.meal == 'Lunch' && doc.user_id == this.user.user_id){
                    this.lunch += doc.kcal
                }else if(doc.meal == 'Dinner' && doc.user_id == this.user.user_id){
                    this.dinner += doc.kcal
                }else if(doc.meal == 'Other...' && doc.user_id == this.user.user_id){
                    this.other += doc.kcal
                }
            })  
        }
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
            this.updates()
        })
    },
}
</script>

<style lang="scss" scoped>
.card{
    margin-bottom: 5px;
}
.black-text{
    color: black
}
ul {
  list-style-type: none;
}
.food-list{
    display: flex;
    justify-content: space-between;
    margin-top: -1px;
    padding: 3px;
    border: 1px solid #aaa;
    margin-left: -24px;
}
.delete-btn{
    height: 3px;
    color: red;
}
.delete-btn:active{
    color: rgba(255, 0, 0, 0.459)
   
}
.home{
    margin-bottom: 60px
}
.total{
    display: flex;
    justify-content: space-between;
    padding: 3px
}
.bold{
    font-weight: 500
}
.meal{
    margin-bottom: 2px;
}
</style>