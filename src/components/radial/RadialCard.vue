<template>
    <div class="radial">
        <v-card>
            <div class="container">
                <div class="title">
                    <v-card-title>Daily Goal:</v-card-title>
                </div>
                <div class="progress">
                    <v-progress-circular
                    :size="150"
                    :width="6"
                    color="#3BD547"
                    :rotate="-90"
                    :value="value">
                    <h3 class="black-text">{{ progress }} <p class="title">left</p></h3>
                    </v-progress-circular>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'RadialCard',
    data(){
        return{
            progress: 200,
            goal: 4000,
            interval: {},
            value: 0,
            test: null,
        }
    },
    beforeDestroy(){
        clearInterval(this.interval)
    },
    mounted(){
        this.interval = setInterval(() => {
            if(this.value === 100){
                return (this.value = 100)
            }
            this.test = (this.goal - this.progress)/this.goal * 100
            this.value = this.test
        }, 0)
    }
}
</script>
<style lang="scss" scoped>
.radial .progress{
    display: flex;
    justify-content: center;
    margin-bottom: 10px
}
.radial .title{
    display: flex;
    justify-content: center;
}
.radial .black-text{
    color: black;
}
</style>