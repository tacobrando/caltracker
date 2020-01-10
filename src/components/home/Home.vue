<template>
    <div class="home">
        <div class="card">
            <RadialCard />
        </div>
    </div>
</template>

<script>
import RadialCard from '../radial/RadialCard'

export default {
    name: 'Home',
    components: {
        RadialCard
    },
    data(){
        return{

        }
    }
}
</script>

<style>
.home{
    margin-top: 60px;
}

</style>