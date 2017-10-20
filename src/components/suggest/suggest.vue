<template>
  <v-scroll class="suggest" 
  :data="result" 
  :pullUp="pullUp"
  @scrollToEnd="_searchMore" 
  ref="suggest"
  :beforeScrollStart = "beforeScrollStart"
  @beforScrollStart="listScroll"
  >
    <!-- 搜索结果 -->
    <ul class="suggest-list">
      <li class="suggest-item" @click="selectItem(item)" v-for="(item,index) in result" :key="index">
        <div class="icon">
          <i :class="getIconCls(item)" class="iconfont"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <v-loading v-show="searchMore" title=""></v-loading>
    </ul>

    <div class="no-result-wrapper">
      <v-no-result title="抱歉，暂无搜索结果" v-show="!searchMore && !result.length"></v-no-result>
    </div>
  </v-scroll>
</template>
<script>


import VScroll from '@/base/scroll/scroll'
import VLoading from '@/base/loading/loading'
import VNoResult from '@/base/noResult/noResult'

import { mapMutations, mapActions } from 'vuex'
import { getSearch } from '@/api/search'
import { ERR_OK } from '@/api/config'
import { createSong } from '@/common/js/song'
// import {filterSinger} from '@/common/js/song'
import Singer from '@/common/js/singer'
import {getBounce } from '@/common/js/utils'

const TYPE_SINGER = 'singer';
const perpage = 20;
export default {
  name: "suggest",
  data() {
    return {
      page: 1,
      result: [],
      searchMore: false,
      pullUp: true,
      beforeScrollStart: true
    };
  },
  components: {
    VScroll,
    VLoading,
    VNoResult
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  created() {

  },
  methods: {
    _searchMore() { //下拉加载
      
      if (!this.searchMore) {
        return
      }
      console.log('重行请求')
      this.page++;
      getSearch(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
         this.result= this.result.concat(this._getResult(res.data));
          this.checkMore(res.data);
        }
      });
    },
    listScroll() {
      this.$emit('scrollBlur')
    },
    _getSearch() { //修改搜索词加载
      this.page = 1;
      this.searchMore = true;
      // this.$refs.suggest.scrollTo(0, 0)
      getSearch(this.query, this.page, this.showSinger, perpage).then((res) => {

        if (res.code === ERR_OK) {
          // console.log(res)
          this.result = this._getResult(res.data)
          this.checkMore(res.data)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    checkMore(data) { //检查数据是否还有
      let song = data.song;
      if (!song.list.length || song.curnum + song.curpage * 20 >= song.totalnum) {
        this.searchMore = false
      }
    },
    _getResult(data) { //处理歌曲和歌手数据
      let box = [];
      if (data.zhida && data.zhida.singerid) {
        box.push({ ...data.zhida, ...{ type: TYPE_SINGER } })
      }
      if (data.song) {
        box = box.concat(this._normalizeSongs(data.song.list))
      }
      return box;
    },
    _normalizeSongs(list) {  //创建数据
      let box = [];
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albummid) {
          box.push(createSong(musicData))
        }
      })
      return box;
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-xin'
      } else {
        return 'icon-shape'
      }
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername;
      } else {
        return `${item.name}-${item.singer}`
      }
    },
    selectItem(item) {
      // 歌手跳转歌手详情
      if(item.type === TYPE_SINGER) {
       
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
         this.$router.push({
          path: `/search/${singer.id}`
        })

       this.setSinger(singer)

      }else{
        // 歌曲跳转歌曲播放
        this.setInsertSong(item)
      }
      this.$emit('select',item)
    },
    refresh() {
      this.$refs.suggest.refresh();
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions({
      setInsertSong: 'insertSong'
    })

  },
  watch: {
    query() {
      this._getSearch();
    }
  }

}
</script>
<style lang="scss" scoped>
@import "~common/sass/variable";
@import "~common/sass/mixin";

.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }
    .icon {
      flex: 0 0 30px;
      width: 30px;
      [class^="icon-"] {
        font-size: 14px;
        color: $color-text-d;
      }
    }
    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;
      .text {
        @include no-wrap();
      }
    }
  }
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translate3d(-50%);
  }
}
</style>