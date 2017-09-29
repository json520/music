<template>
  <div class="recommend" ref="recommend">
    <!-- banner -->
    <scroll ref="scroll" class="recommend_content" :data="discList">

      <div>
        <div v-if="recommendList.length" class="slider_wrapper">
          <v-slider>
            <div v-for="(item,index) in recommendList" :key="index">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="_onloadImage" :src="item.picUrl" />
              </a>
            </div>
          </v-slider>
        </div>

        <!-- 歌单推荐 -->
        <div class="recommend_list">
          <h1 class="list_title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item,index) in discList" class="item" :key="index" @click="selectItem(item)">
              <div class="icon">
                <img style="{width:60px;height:60px;}" v-lazy="item.imgurl" />
              </div>
              <div class="text">
                <h2 class="name">{{item.creator.name}}</h2>
                <p class="desc">{{item.dissname}}</p>
              </div>

            </li>
          </ul>
        </div>
      </div>
      <!-- 加载中 -->
      <div class="loading_container" v-show="!discList.length">
        <v-loading></v-loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { getRecommend, getDiscList } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
import VSlider from '@/base/slider/slider'
import Scroll from '@/base/scroll/scroll'
import VLoading from '@/base/loading/loading'
import { playListMixin } from '@/common/js/mixins'
import { mapMutations } from 'vuex'
export default {
  name: 'recommend',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      recommendList: [],
      discList: []
    }
  },
  created() {
    //  setTimeout(()=>{

    //   },1000)
    this._getAjaxData();
    // setTimeout(() =>{

    this._getDiscList();
    // },2000)
  },
  components: {
    VSlider,
    Scroll,
    VLoading
  },
  methods: {
    selectItem(item){
      console.log(item)
      this.$router.push({
        path:`/recommend/${item.dissid}`
      })
      this.setDesc(item)
    },  
    handlePlayList(playList) {
      let bottom = playList.length > 0 ? '60px' : '';
      this.$refs.recommend.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    _getAjaxData() {

      getRecommend().then((res) => {
        // console.log(res)
        if (res.code === ERR_OK) {
          // console.log('成功返回')
          this.recommendList = res.data.slider;
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    _getDiscList() {

      getDiscList().then((res) => {
        // console.log(res)
        if (res.code === ERR_OK) {
          // console.log(res.data.list)
          this.discList = res.data.list;
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    _onloadImage() { //防止异步加载图片缓慢scroll组件无法监听到高度导致滚动不到底部
      if (!this.loaded) {
        this.loaded = true;
        this.$refs.scroll.refresh()
      }
    },
    ...mapMutations({
      setDesc: 'SET_DESC'
    })
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// 需要用分号隔开
@import "~common/sass/variable.scss";

.recommend {
  background: #212F3D;
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .recommend_content {
    height: 100%;
    overflow: hidden;

    .slider_wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .recommend_list {

      .list_title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;
        .icon {

          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
          .name {
            margin-bottom: 10px;
            color: $color-text;
          }
          .desc {
            color: $color-text-d
          }
        }
      }
    }
    .loading_container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
