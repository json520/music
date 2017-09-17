<template>
  <div class="singer">
    <!-- 滚动列表 -->
    <v-singer-list-view @select="selectSinger" :data="singerList"></v-singer-list-view>
      <router-view></router-view>  
  </div>
</template>

<script>

import { getSingerList } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import Singer from '@/common/js/singer'
import VSingerListView from '@/base/singerListView/singerListView'
import {mapMutations} from 'vuex'

const HOST_SINGER_LEN = 10;
const HOST_SINGER_NAME = '热门'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      singerList:[]
    }
  },
  components:{
    VSingerListView
  },
  created(){
    this._getAjaxSinger();
  },
  methods: {
    selectSinger(singer){
      // console.log(singer)
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      // 把singer对象放入state状态管理里面
      this.setSinger(singer)

    },
    _getAjaxSinger(){
        getSingerList().then((res) =>{
          if(res.code === ERR_OK){
              // console.log(res)
              this.singerList = this._formateSingerList(res.data.list);
              // console.log(this.singerList)
        }
          
        }).catch((err) =>{
          console.log(err)
        })
    },
    _formateSingerList(list){
      /*
      1.创建一个host为10的名单；
      2.按字母排序出来一个数组
      */
        let map = {
          hot:{
            title: HOST_SINGER_NAME,
            items: []
          }
        }
     
        list.forEach((item,index) =>{

          // 前10个添加到map的热门里面
          if(index < HOST_SINGER_LEN){
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
              }))

            
          }

         // 如果map里面没有对应的字母则创建一个
          const key = item.Findex;

          if(!map[key]){
            map[key] = {
              title: key,
              items: []
            }
          }

          // 把对应的Findex添加到同一个数组里面去
          map[key].items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
              }))

        })
        // 得到的不是一个有序列表！需要把map转换为数组！里面又Findex=9的数据！要进行正则检查！
        //剔除掉Findex为数字的元素！只剩下title为a-z和hot的元素！
        let singerList = []
        let hotList = []
        for(let value in map){
          let val = map[value];
          if(val.title.match(/[a-zA-Z]/)){
            singerList.push(val);
          }else if(val.title === HOST_SINGER_NAME){
            hotList.push(val);
          }
        }        
        //设置一个对象属性方法！通过charCodeAt(0)进行排序！
        singerList.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })

          return hotList.concat(singerList)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.singer{
  position: fixed;
  left:0;
  top: 88px;
  bottom: 0px;
  width: 100%;
  z-index:1;
}
</style>
