<template>
  <div id="app">
    <img class="appImg" src="./assets/logo1.png">
    <v-tab></v-tab>
    <router-view></router-view>
  </div>
</template>

<script>
import VTab from '@/components/tab/tab'

export default {
  name: 'app' ,
  components : {
    VTab
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  background:#212F3D;
  color:white;
  width:100%;
  height:100%;
}
body{
  margin:0;
  width:100%;
  height:100%;
}
.appImg{
  width:100px;
  margin:0 auto;
}
</style>
