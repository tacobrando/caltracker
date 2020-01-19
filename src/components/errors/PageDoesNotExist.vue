<template>
    <div class="error">
        <h1>404</h1>
        <h2>Sorry, page does not exist or is currently unavailable</h2>
    </div>
</template>

<script>
export default {
    name: "PageDoesNotExist",
}
</script>

<style lang="scss" scoped>
.error h1{
    left: 0;
    font-size: 4em;
    margin-top: -100px;
    position: absolute;
    text-align: center;
    top: 50%;
    width: 100%;
}
.error h2{
    left: 0;
    position: absolute;
    text-align: center;
    top: 47%;
    width: 100%;
}


</style>