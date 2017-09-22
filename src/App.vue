<template>
  <div id="app">
    <img class="appImg" src="./assets/logo1.png">
    <v-tab></v-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
<!-- 播放器 -->
    <v-player></v-player>
  </div>
</template>

<script>
import VTab from '@/components/tab/tab'
import VPlayer from '@/components/player/player'

export default {
  name: 'app',
  components: {
    VTab,
    VPlayer
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
  background: #212F3D;
  color: white;
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
  width: 100%;
  height: 100%;
}

.appImg {
  width: 100px;
  margin: 0 auto;
}
</style>
