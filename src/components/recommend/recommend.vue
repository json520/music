<template>
  <div class="hello">
    推荐
    
  </div>
</template>

<script>
import { getRecommend } from '@/api/recommend'
import { ERR_ok } from '@/api/config'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    getAjaxData(){
      // alert('11')
      getRecommend().then((res) =>{
        console.log(res)
        if(res.code === ERR_ok){
          console.log('成功返回')
        }
      }).catch((err) =>{
        console.log(err)
      })
    }
  },
  mounted(){
    this.getAjaxData();
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
