<template>
  <div class="about black-text">
    <div class="container">
          <h1>About CalTracker</h1>
          <v-card-text>
              <div class="about-text">
                  <p>
                      CalTracker is a calorie tracking fitness app. This app is still a Work in progress and more will be added in feature builds
                      but for now, you may have a look at what is currently available.
                  </p>
              </div>
          </v-card-text>
    </div>
  </div>
</template>

<script>
export default {
    name: 'About',
    data(){
        return{

        }
    }
}
</script>

<style>
.black-text {
    color: black
}
.about{
    margin: 50px;
    text-align: center
}

</style>