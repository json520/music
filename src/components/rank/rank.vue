<template>
  <div class="rank" ref="rank">
    <v-scroll class="toplist" :data="rankList" ref="toplist">
      <ul>
        <li class="item" v-for="(items,indexs) in rankList" :key="indexs" @click="selectItem(items)">
          <div class="icon">
            <img v-lazy="items.picUrl" />
          </div>
          <ul class="songlist">
            <li class="song" v-for="(item,index) in items.songList" :key="index">
              <span>{{index + 1}}</span>
              <span>{{item.songname}}--{{item.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!rankList.length">
        <v-loading></v-loading>
      </div>
    </v-scroll>
    <router-view></router-view>
  </div>
</template>

<script>

import VScroll from '@/base/scroll/scroll'
import VLoading from '@/base/loading/loading'

import {mapMutations} from 'vuex'
import {playListMixin} from '@/common/js/mixins'
import { getTopList } from '@/api/rank'
import { ERR_OK } from '@/api/config'

export default {
  name: 'hello',
  mixins:[
    playListMixin
  ],
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      rankList: []
    }
  },
  components:{
    VScroll,
    VLoading
  },
  created() {
    this._getTopList();
  },
  methods: {
    handlePlayList(playList) {
      let bottom = playList.length > 0 ? '60px' : '';
      this.$refs.rank.style.bottom = bottom;
      this.$refs.toplist.refresh();
    },
    _getTopList() {
      getTopList().then((res) => {
        if (res.code === ERR_OK) {
            this.rankList = res.data.topList;
          // console.log(res.data)
        }
      }).catch((err) => {

      })
    },
    selectItem(items){
      this.$router.push({
        path: `/rank/${items.id}`
      })
      this.setTopList(items)
    },
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    })

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@import '~common/sass/variable';
@import '~common/sass/mixin';
.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  background: $color-highlight-background;
  .toplist {
    height: 100%;
    overflow: hidden;
    .item{
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 100px;
      &:last-child{
        padding-bottom: 20px;
      }
      .icon{
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }
      .songlist{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content:center;
        padding: 0 20px; 
        height: 100px;
        overflow: hidden;
        background: $color-highlight-background;
        color: $color-text-d;
        font-size: $font-size-small;
        .song{
          @include no-wrap();
          line-height: 26px;
        }
      }
    }
    .loading-container{
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
