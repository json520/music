<template>
  <transition name="slide">
    <div class="user-center" >

      <div class="back" @click="back">
        <i class="icon-back iconfont icon-fanhui"></i>
      </div>

      <div class="switches-wrapper">
        <v-switches :button="button" :currentIndex="currentIndex" @select="selectSwitches"></v-switches>
      </div>

      <div class="play-btn" @click="random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <!-- 我的收藏 -->
        <v-scroll ref="favoriteList" class="list-scroll" :data="favoriteList" v-if="currentIndex === 0">
          <div class="list-inner">
            <v-song-list :songList="favoriteList" @select="selectSong"></v-song-list>
          </div>
        </v-scroll>
        <!-- 最近听的 -->
        <v-scroll ref="playList" class="list-scroll" :data="playHistory" v-if="currentIndex === 1">
          <div class="list-inner">
            <v-song-list :songList="playHistory" @select="selectSong"></v-song-list>
          </div>
        </v-scroll>

      </div>
      <!-- 无内容!考虑边界情况 -->
      <div class="no-result-wrapper" v-show="noResult">
        <v-no-result :title="noResultDesc"></v-no-result>
      </div>

    </div>
  </transition>
</template>
<script>
import VSwitches from '@/base/switches/switches'
import VScroll from '@/base/scroll/scroll'
import VSongList from '@/base/songList/songList'
import VNoResult from '@/base/noResult/noResult'
import Song from '@/common/js/song'
import { mapGetters, mapActions } from 'vuex'
import { playListMixin } from '@/common/js/mixins'
export default {
  name: "userCenter",
  mixins: [playListMixin],
  data() {
    return {
      currentIndex: 0,
      button: [
        { name: '我的收藏' },
        { name: '最近听的' }
      ]
    };
  },
  created() {
    console.log(this.favoriteList)
  },
  computed: {
    noResult(){
      if(this.currentIndex === 0){
        // 通过数据的长度Boolean显示影藏
        return !this.favoriteList.length
      } else {
        return !this.playHistory.length
      }
    },
    noResultDesc() {
      if(this.currentIndex === 0) {
        return '暂无收藏歌曲'
      } else {
        return '你还没有听过歌曲'
      }
    },
    ...mapGetters([
      'favoriteList',
      'playHistory'
    ])
  },
  components: {
    VSwitches,
    VScroll,
    VSongList,
    VNoResult
  },
  methods: {
    handlePlayList(playList){
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.listWrapper.style.bottom = bottom;
      this.$refs.favoriteList && this.$refs.favoriteList.refresh();
      this.$refs.playList && this.$refs.playList.refresh();
    },
    selectSwitches(index) {
      this.currentIndex = index;
    },
    back() {
      this.$router.back();
    },
    selectSong(song) {
      this.insertSong(new Song(song))
    },
    random() { //随机播放
      let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory;

      if (list.length === 0) {
        return
      }
      // list需要重行实例化一下
      list = list.map((song) => {
        return new Song(song)
      })

      this.randomPlay({
        list: list
      })
    },
    ...mapActions({
      insertSong: 'insertSong',
      randomPlay: 'randomPlay'
    })
  }
}
</script>
<style lang="scss" scoped>
@import "~common/sass/variable";
.user-center {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background: $color-background;
  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.3s;
  }
  &.slide-enter,
  &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .switches-wrapper {
    margin: 10px 0 30px 0;
  }
  .play-btn {
    box-sizing: border-box;
    width: 135px;
    padding: 7px 0;
    margin: 0 auto;
    text-align: center;
    border: 1px solid $color-text-l;
    color: $color-text-l;
    border-radius: 100px;
    font-size: 0;
    .icon-play {
      display: inline-block;
      vertical-align: middle;
      margin-right: 6px;
      font-size: $font-size-medium-x;
    }
    .text {
      display: inline-block;
      vertical-align: middle;
      font-size: $font-size-small;
    }
  }
  .list-wrapper {
    position: absolute;
    top: 110px;
    bottom: 0;
    width: 100%;
    .list-scroll {
      height: 100%;
      overflow: hidden;
      .list-inner {
        padding: 20px 30px;
      }
    }
  }
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>