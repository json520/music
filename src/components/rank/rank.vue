<template>
  <div class="hello">
    排行榜
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created(){
    // this.getFun();
  },
  methods:{
    getFun(){
     axios.get('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1500794924115',{
       params : {

       }
     })
     .then((res) =>{
       console.log(res)
     })
     .catch((err) =>{
       console.log(err)
     })
    }
  },
  mounted(){
    // this.getFun()
    // alert(1)
    // this.getFun();
    // this.getFun();/
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
