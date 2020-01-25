<template>
    <div class="home">
        <div class="card">
            <RadialCard :total="total" />
        </div>
        <div>
            <AddCal class="meal" meal="Breakfast" />
            <ul v-for="(item, i) in diary" :key="i">
                <li v-if="item.meal == 'Breakfast'">
                    <span class="black-text">{{ item.food }}</span>
                    <span class="black-text">{{ item.kcal }}</span>
                </li>
            </ul>
            <div class="total" v-if="breakfast">
                <span class="black-text bold">Total:</span>
                <span class="black-text bold">{{ breakfast }}</span>
            </div>
        </div>
        <div>
            <AddCal class="meal" meal="Lunch" />
            <ul v-for="(item, i) in diary" :key="i">
                <li v-if="item.meal == 'Lunch'">
                    <span class="black-text">{{ item.food }}</span>
                    <span class="black-text">{{ item.kcal }}</span>
                </li>
            </ul>
            <div class="total" v-if="lunch">
                <span class="black-text bold">Total:</span>
                <span class="black-text bold">{{ lunch }}</span>
            </div>
        </div>
        <div>
            <AddCal class="meal" meal="Dinner" />
            <ul v-for="(item, i) in diary" :key="i">
                <li v-if="item.meal == 'Dinner'">
                    <span class="black-text">{{ item.food }}</span>
                    <span class="black-text">{{ item.kcal }}</span>
                </li>
            </ul>
            <div class="total" v-if="dinner">
                <span class="black-text bold">Total:</span>
                <span class="black-text bold">{{ dinner }}</span>
            </div>
        </div>
        <div>
            <AddCal class="meal" meal="Other..." />
            <ul v-for="(item, i) in diary" :key="i">
                <li v-if="item.meal == 'Other...'">
                    <span class="black-text">{{ item.food }}</span>
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
            total: null,
            breakfast: null,
            lunch: null,
            dinner: null,
            other: null
        }
    },
    methods: {
        ellipsify(str){
            if (str.length > 25) {
                return (str.substring(0, 25) + "...");
            }
            else {
                return str;
            }
        },
       addTotal(){
            this.diary.forEach(doc => {
                this.total += doc.kcal
                switch(doc.meal){
                    case 'Breakfast':
                        this.breakfast += doc.kcal
                        break
                    case 'Lunch':
                        this.lunch += doc.kcal
                        break
                    case 'Dinner':
                        this.dinner += doc.kcal
                        break
                    case 'Other...':
                        this.other += doc.kcal
                }
            })  
        }
    },
    mounted(){
        let ref = db.collection('diary')
        ref.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added'){
                    let doc = change.doc.data()
                    this.diary.push(doc)
                    this.diary.id = change.doc.id
                    this.total = null
                    this.breakfast = null
                    this.lunch = null
                    this.dinner = null
                    this.other = null
                }
            })
                this.addTotal()
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
li {
    display: flex;
    justify-content: space-between;
    padding: 2px;
    border: 1px solid #aaa;
    margin-left: -24px;
}
.home{
    margin-bottom: 60px
}
.total{
    display: flex;
    justify-content: space-between;
    padding: 2px
}
.bold{
    font-weight: 500
}
.meal{
    margin-bottom: 1px;
}
</style>