<template>
  <transition name="slide" >
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close iconfont icon-xin"></i>
        </div>
      </div>

      <div class="search-box-wrapper">
        <v-search-box @query="onQueryChange" placeholder="添加歌曲"></v-search-box>
      </div>
      <!-- 切换显示 -->
      <div class="shortcut" v-show="!query">
        <v-switches :button="button" :currentIndex="currentIndex" @select="selectSwitches"></v-switches>
        <div class="list-wrapper">
            <!-- 最近播放 -->
          <v-scroll ref="songList" class="list-scroll" :data="playHistory" v-if="currentIndex === 0">
            <div class="list-inner">
              <v-song-list :songList="playHistory" @select="selectSong"></v-song-list>
            </div>
          </v-scroll>
            <!-- 历史纪录 -->
          <v-scroll ref="searchList" class="list-scroll" :data="searchHistory" v-if="currentIndex === 1">
            <div class="list-inner">
              <v-search-list :searches="searchHistory" ></v-search-list>
            </div>
          </v-scroll>

        </div>
       
      </div>

      <div class="search-result" v-show="query">
        <v-suggest :query="query" :showSinger="showSinger" @select="selectSuggest"></v-suggest>
      </div>

      <v-top-tip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok iconfont icon-xin"></i>
          <span class="text">1首歌添加完成</span>
        </div>
      </v-top-tip>
    </div>

  </transition>
</template>
<script>
import VSearchBox from '@/base/searchBox/searchBox'
import VSuggest from '@/components/suggest/suggest'
import VSwitches from '@/base/switches/switches'
import VScroll from '@/base/scroll/scroll'
import VSongList from '@/base/songList/songList'
import VSearchList from '@/base/searchList/searchList'
import VTopTip from '@/base/topTip/topTip'
import { mapGetters ,mapActions} from 'vuex'
import Song from '@/common/js/song'
export default {
  name: "addSong",
  data () {
    return {
      showFlag: false,
      showSinger: false,
      query: '',
      currentIndex: 0,
      button: [
        {name: '最近播放'},
        {name: '历史记录'}
      ]
    };
  },
  computed: {
    ...mapGetters([
      'playHistory',
      'searchHistory'
    ])
  },
  components: {
    VSearchBox,
    VSuggest,
    VSwitches,
    VScroll,
    VSongList,
    VSearchList,
    VTopTip
  },
  methods: {
    show() {
      this.showFlag = true
      // 进行延迟刷新！
      setTimeout(()=>{

        if(this.currentIndex === 0) {
          this.$refs.songList.refresh();
        }else if(this.currentIndex === 1){
          this.$refs.searchList.refresh();
        }
      },20)
    },
    hide() {
      this.showFlag = false
    },
    onQueryChange(query) {
      this.query = query
    },
    selectSuggest(item) {
     
    },
    selectSwitches(index) {
      this.currentIndex = index;
    },
    selectSong(item, index) {
      if(index !== 0){
        // item不是一个实例需要重行new下！转化为实例
        this.insertSong(new Song(item))
        this.showTopTip();
      }
    },
    showTopTip() {
      this.$refs.topTip.show()
    },
    ...mapActions({
      insertSong: 'insertSong'
    })

  }
}
</script>
<style lang="scss" scoped>
@import "~common/sass/variable";
@import "~common/sass/mixin";
.add-song{
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 200;
  background: $color-background;
  &.slide-enter-active,&.slide-leave-active{
    transition: all 0.3s;
  }
  &.slide-enter, &.slide-leave-to{
    transform: translate3d(100%, 0, 0);

  }
  .header{
    position: relative;
    height: 44px;
    text-align: center;
    .title{
      line-height: 44px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .close{
      position: absolute;
      top: 0;
      right: 8px;
      .icon-close{
        display: block;
        padding: 12px;
        font-size: 20px;
        color: $color-theme;
      }
    }
  }
  .search-box-wrapper{
    margin: 20px;

  }
  .shortcut{
    .list-wrapper{
      position: absolute;
      top: 165px;
      bottom: 0;
      width: 100%;
      .list-scroll{
        height: 100%;
        overflow: hidden;
        .list-inner{
          padding: 20px 30px;
        }
      }
    }
  }
  .search-result{
    position: fixed;
    top: 124px;
    bottom: 0;
    width: 100%;
  }
  .tip-title{
    text-align: center;
    padding: 18px 0;
    font-size: 0;
    .icon-ok{
      font-size: $font-size-medium;
      color: $color-theme;
      margin-right: 4px;
    }
    .text{
      font-size: $font-size-medium;
      color: $color-text;
    }
  }
}
</style>