<template>
    <div class="fab-btn"> 
        <v-btn
        large
        color="#3BB1E5" 
        fab>
            <v-icon class="icon-white">mdi-camera</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    name: 'Fab',
    data(){
        return{

        }
    }
}
</script>

<style>
.fab-btn{
    display: flex;
    justify-content: center;
}
.icon-white{
    color: white
}

</style>