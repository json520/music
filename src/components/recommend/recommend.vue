<template>
  <div class="recommend">
    <!-- banner -->
    <scroll class="recommend_content" :data="discList">
   
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
    
    
    <!-- 歌单推荐 -->
        <div class="recommend_list">
          <h1 class="list_title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item,index) in discList" class="item">
              <div class="icon">
                <img style="{width:60px;height:60px;}" :src="item.imgurl" />
              </div>
              <div class="text">
                <h2 class="name">{{item.creator.name}}</h2>
                <p class="desc">{{item.dissname}}</p>
              </div>

            </li>
          </ul>
        </div> 

      </div>
    </scroll>
  </div>
</template>

<script>
import { getRecommend , getDiscList} from '@/api/recommend'
import { ERR_ok } from '@/api/config'
import VSlider from '@/base/slider/slider'
import Scroll from '@/base/scroll/scroll'
export default {
  name: 'recommend',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      recommendList:[],
      discList:[]
    }
  },
  created(){
      this._getAjaxData();
      this._getDiscList();
  },
  components:{
    VSlider,
    Scroll
  },
  methods:{
    _getAjaxData(){
      
      getRecommend().then((res) =>{
        // console.log(res)
        if(res.code === ERR_ok){
          // console.log('成功返回')
          this.recommendList = res.data.slider;
        }
      }).catch((err) =>{
        console.log(err)
      })
    },
    _getDiscList(){
      
        getDiscList().then((res)=>{
          console.log(res)
            if(res.code === ERR_ok){
              
              console.log(res.data.list)
              this.discList = res.data.list;
            }
        }).catch((err)=>{
          console.log(err)
        })
    }
  },
  mounted(){
    
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// 需要用分号隔开
@import "~common/sass/variable.scss";

.recommend{
  background:#212F3D;
  position:fixed;
  width:100%;
  top:88px;
  bottom:0;
  .recommend_content{
    height:100%;
    overflow:hidden;
 
    .slider_wrapper{
      position:relative;
      width:100%;
      overflow:hidden;
    }
    .recommend_list{
      
      .list_title{
        height:65px;
        line-height:65px;
        text-align:center;
        font-size:$font-size-medium;
        color:$color-theme;
      }
      .item{
        display:flex;
        box-sizing:border-box;
        align-items:center;
        padding:0 20px 20px 20px;
        .icon{
          
          flex:0 0 60px;
          width:60px;
          padding-right:20px;
        }
        .text{
          display:flex;
          flex-direction:column;
          justify-content:center;
          flex:1;
          line-height:20px;
          overflow:hidden;
          font-size:$font-size-medium;
          .name{
            margin-bottom:10px;
            color:$color-text;
          }
          .desc{
            color:$color-text-d
          }
        }
      }
    }
    .loading_container{
      position:absolute;
      width:100%;
      top:50%;
      transform:translateY(-50%);
    }
   }
}

</style>
