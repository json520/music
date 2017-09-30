<template>
  <div class="suggest">
    <!-- 搜索结果 -->
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item,index) in result" :key="index">
        <div class="icon">
          <i :class="getIconCls(item)" class="iconfont"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
    </ul>

  </div>
</template>
<script>
import { getSearch } from '@/api/search'
import { ERR_OK } from '@/api/config'
import {createSong} from '@/common/js/song'
import {filterSinger} from '@/common/js/song'
const TYPE_SINGER = 'singer';

export default {
  name: "suggest",
  data() {
    return {
      page: 1,
      result: []
    };
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
    // this._getSearch();
  },
  methods: {
    _getSearch() {
      getSearch(this.query, this.page, this.showSinger).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res)
          this.result = this._getResult(res.data)
          console.log(this.result)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    _getResult(data) { //处理歌曲和歌手数据
      let box = [];
      if(data.zhida && data.zhida.singermid) {
        box.push({...data.zhida.singername,...{type:TYPE_SINGER}})
      }
      if(data.song) {
        box = box.concat(this._normalizeSongs(data.song.list))
      }
      return box;
    },
    _normalizeSongs(list) {  //创建数据
      let box = [];
      list.forEach((musicData)=> {
        if(musicData.songid && musicData.albummid) {
          box.push(createSong(musicData))
        }
      })
      return box;
    },
    getIconCls(item){
      if(item.type === TYPE_SINGER){
        return 'icon-xin'
      }else{
        return 'icon-shape'
      }
    },
    getDisplayName(item){
      if(item.type === TYPE_SINGER){
        return item.singername;
      }else{
        return `${item.name}-${item.singer}`
      }
    }

  },
  watch:{
    query(){
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
      [class^="icon-"]{
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