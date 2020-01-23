<template>
    <div class="home">
        <div class="card">
            <RadialCard />
        </div>
        <div class="card">
            <AddBreakfast />
        </div>
        <div class="card">
            <AddLunch />
        </div>
        <div class="card">
            <AddDinner />
        </div>
        <div class="card">
            <AddOther />
        </div>
    </div>
</template>

<script>
import RadialCard from '../radial/RadialCard'
import AddBreakfast from '../tracker/AddBreakfast'
import AddLunch from '../tracker/AddLunch'
import AddDinner from '../tracker/AddDinner'
import AddOther from '../tracker/AddOther'

export default {
    name: 'Home',
    components: {
        RadialCard,
        AddBreakfast,
        AddLunch,
        AddDinner,
        AddOther
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