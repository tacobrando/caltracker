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

<style lang="scss" scoped>
.home{
    margin-top: 55px;
}

</style>