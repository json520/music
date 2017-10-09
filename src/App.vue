<template>
  <div id="app">
    <!-- <img class="appImg" src="./assets/logo1.png"> -->
    <v-my-header></v-my-header>
    <v-tab></v-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
<!-- 播放器 -->
    <v-player></v-player>
  </div>
</template>

<script>
import VMyHeader from '@/components/myHeader/myHeader'
import VTab from '@/components/tab/tab'
import VPlayer from '@/components/player/player'

export default {
  name: 'app',
  components: {
    VTab,
    VPlayer,
    VMyHeader
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
  
  color: white;
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
  width: 100%;
  height: 100%;
  background: #222;
}

.appImg {
  width: 100px;
  height:44px;
  margin: 0 auto;
}
</style>
