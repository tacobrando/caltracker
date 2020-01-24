<template>
    <div class="home">
        <div class="card">
            <RadialCard />
        </div>
        <div class="card">
            <AddCal meal="Breakfast" />
            <ul v-for="(item, i) in diary" :key="i">
                <li v-if="item.meal == 'Breakfast'">
                    <span class="black-text">{{ item.food }}</span>
                    <span class="black-text">{{ item.kcal }}</span>
                </li>
            </ul>
        </div>
        <div class="card">
            <AddCal meal="Lunch" />
            <ul v-for="(item, i) in diary" :key="i">
                <li v-if="item.meal == 'Lunch'">
                    <span class="black-text">{{ item.food }}</span>
                    <span class="black-text">{{ item.kcal }}</span>
                </li>
            </ul>
        </div>
        <div class="card">
            <AddCal meal="Dinner" />
            <ul v-for="(item, i) in diary" :key="i">
                <li v-if="item.meal == 'Dinner'">
                    <span class="black-text">{{ item.food }}</span>
                    <span class="black-text">{{ item.kcal }}</span>         
                </li>
            </ul>
        </div>
        <div class="card">
            <AddCal meal="Other..." />
            <ul v-for="(item, i) in diary" :key="i">
                <li v-if="item.meal == 'Other...'">
                    <span class="black-text">{{ item.food }}</span>
                    <span class="black-text">{{ item.kcal }}</span>   
                </li>
            </ul> 
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
        }
    },
    methods: {
        checker(e){
            console.log(e)
        }

    },
    created(){
        let ref = db.collection('diary')
        ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.diary.push(doc.data()),
                this.diary.id = doc.id
            })
        })
    }
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
.home{
    margin-bottom: 55px
}
</style>