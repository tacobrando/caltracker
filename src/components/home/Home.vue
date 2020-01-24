<template>
    <div class="home">
        <div class="card">
            <RadialCard />
        </div>
        <div class="card">
            <AddCal meal="Breakfast" />
        </div>
        <div class="card">
            <AddCal meal="Lunch" />
        </div>
        <div class="card">
            <AddCal meal="Dinner" />
        </div>
        <div class="card">
            <AddCal meal="Other..." />
        </div>
    </div>
</template>

<script>
import RadialCard from '../radial/RadialCard'
import AddCal from './AddCal'
import moment from 'moment'

export default {
    name: 'Home',
    components: {
        RadialCard,
        AddCal,

    },
    data(){
        return{

        }
    }
}
</script>

<style lang="scss" scoped>
.card{
    margin-bottom: 5px;
}
</style>