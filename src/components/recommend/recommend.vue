<template>
  <div class="recommend">
   <div>
     <div v-if="recommendList.length" class="slider_wrapper">
        <v-slider>
            <div v-for="(item,index) in recommendList" :key="index">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl" />
                </a>               
            </div>
        </v-slider>
     </div>
   </div>
    
  </div>
</template>

<script>
import { getRecommend } from '@/api/recommend'
import { ERR_ok } from '@/api/config'
import VSlider from '@/base/slider/slider'
export default {
  name: 'recommend',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      recommendList:[]
    }
  },
  components:{
    VSlider
  },
  methods:{
    getAjaxData(){
      
      getRecommend().then((res) =>{
        console.log(res)
        if(res.code === ERR_ok){
          console.log('成功返回')
          this.recommendList = res.data.slider;
        }
      }).catch((err) =>{
        console.log(err)
      })
    }
  },
  mounted(){
    this.getAjaxData();
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
