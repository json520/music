<template>
  <div class="tab">
    <ul class="tab_list">
      <router-link to="/recommend" tag="li">推荐</router-link>
      <router-link to="/singer"  tag="li">歌手</router-link>
      <router-link to="/search" tag="li">搜索</router-link>
      <router-link to="/rank" tag="li">排行</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    getFun(){
      alert(1)
    }
  },
  mounted(){
    // this.getFun();
    // this.getFun();/
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab{
  width:100%;
  height:88px;
}
.tab_list{
  width:100%;
  overflow:hidden;
  display:-webkit-box;
  -webkit-box-align:center;
  
}
.tab_list li{
  display:inline-table;

}
.router-link-active{
  color:yellowgreen;

}
</style>
