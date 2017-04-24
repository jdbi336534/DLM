<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'app'
}
</script>
<style lang="scss">
@import './assets/css/colors.scss';
body,
ul,
li,
dl,
dt,
dd,
ol {
    margin: 0;
    padding: 0;
    list-style: none;
}

body {
    background-color: #0D152F;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 14px;
}
</style>
