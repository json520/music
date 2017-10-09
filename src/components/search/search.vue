<template>
  <div class="search">
    <!-- 搜索 -->
    <div class="search-box-wrapper">
      <v-search-box ref="searchBox" @query="onQueryChange"></v-search-box>
    </div>
    <!-- 热门搜索 -->
    <div class="shortcut-wrapper" v-show="!query" ref="shortcurWraper">
      <v-scroll class="shortcut" ref="shortcur" :data="shortcur" :refreshDelay="refreshDelay">
        <div>

          <div class="hot-key" >
            <h1 class="title">热门搜索</h1>
            <ul :style="{textAlign:'start'}">
              <li class="item" v-for="(item,index) in hotKeyList" :key="index" @click="selectHotKey(item.k)">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>

          <div class="search-history" v-show="searchHistory" >
            <h1 class="title" :style="{textAlign:'start'}">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear iconfont icon-xin"></i>
              </span>
            </h1>
            <v-search-list :searches="searchHistory" @select="selectHotKey" @delete="deleteOne"></v-search-list>
          </div>

        </div>
      </v-scroll>
    </div>
    <!-- 搜索结果 -->
    <div class="search-result" v-show="query" ref="searchResult">
      <v-suggest ref="suggest" :query="query" @scrollBlur="blur" @select="savaSearchHistory" >222</v-suggest>
    </div>
    <!-- 跳转子路由详情页 -->
    <router-view></router-view>
    <!-- 清空弹窗 -->
    <v-confirm 
      ref="confirm"
      @confirm="_confirm" 
      confirmBtnText="清空"
      text="确定清空搜索历史记录"
    ></v-confirm>
  </div>
</template>

<script>
import VSearchBox from '@/base/searchBox/searchBox';
import { getHotKey } from '@/api/search'
import VScroll from '@/base/scroll/scroll'
import VSuggest from '@/components/suggest/suggest'
import VSearchList from '@/base/searchList/searchList'
import VNoResult from '@/base/noResult/noResult'
import VConfirm from '@/base/confirm/confirm'
import { ERR_OK } from '@/api/config'
import { mapActions, mapGetters } from 'vuex'
import { playListMixin } from '@/common/js/mixins'
export default {
  mixins:[
    playListMixin
  ],
  name: 'search',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      hotKeyList: [],
      query: '',
      refreshDelay: 100
    }
  },
  computed: {
    shortcur() {
      return this.searchHistory.concat(this.hotKeyList)
    },
    ...mapGetters([
      'searchHistory'
    ])
  },
  components: {
    VSearchBox,
    VSuggest,
    VNoResult,
    VSearchList,
    VConfirm,
    VScroll
  },
  created() {
    this._getHotKey()
    console.log(this.searchHistory)
  },
  methods: {
    handlePlayList(playList) {
      let bottom = playList.length > 0 ? '60px' : ''
      this.$refs.shortcurWraper.style.bottom = bottom;
      this.$refs.shortcur.refresh();

      this.$refs.searchResult.style.bottom = bottom;
      this.$refs.suggest.refresh();
    },
    showConfirm() {
      this.$refs.confirm.show();
    },
    
    _confirm(){
      this.clearSearchHistory()
    },
    _getHotKey() {
      getHotKey().then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res.data.hotkey.slice(0, 10))
          this.hotKeyList = res.data.hotkey.slice(0, 10);
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    selectHotKey(item) { //点击热门搜索词--通过点击获取组件里面的方法

      this.$refs.searchBox.selectHotKey(item)
    },
    onQueryChange(query) {
      this.query = query
    },
    blur() {
      this.$refs.searchBox.blur();
    },
    savaSearchHistory(item) {
      // console.log(item)
      this.saveSearchHistory(this.query)
    },
    deleteOne(item) {
      
      this.deleteSearchHistory(item)
    },
    ...mapActions({
      saveSearchHistory: 'saveSearchHistory',
      deleteSearchHistory: 'deleteSearchHistory',
      clearSearchHistory: 'clearSearchHistory'
    }),

  },
  watch:{
    query(newVal){  //没有newVal就是删除搜索词的时候
      if(!newVal){
        setTimeout(() =>{
          this.$refs.shortcur.refresh()
        },20)
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~common/sass/variable";
@import "~common/sass/mixin";

.search {
  .search-box-wrapper {
    margin: 20px;
  }
  .shortcut-wrapper {
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;
    .shortcut {
      height: 100%;
      overflow: hidden;
      .hot-key {
        margin: 0 20px 20px 20px;
        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
          text-align: start;
        }
        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }
      .search-history {
        position: relative;
        margin: 0 20px;
        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;
          .text {
            flex: 1;
          }
          .clear {
            //  extend-cl
            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
  }
  .search-result {
    position: fixed;
    width: 100%;
    top: 178px;
    bottom: 0;
  }
}
</style>
