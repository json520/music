<template>
  <div class="search">
    <!-- 搜索 -->
    <div class="search-box-wrapper">
      <v-search-box ref="searchBox" @query="onQueryChange"></v-search-box>
    </div>
    <!-- 热门搜索 -->
    <div class="shortcut-wrapper">
      <div class="shortcut" v-show="!query">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul :style="{textAlign:'start'}">
            <li class="item" v-for="(item,index) in hotKeyList" :key="index" @click="selectHotKey(item)">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="search-result" v-show="query">
      <v-suggest :query="query">222</v-suggest>
    </div>
  </div>
</template>

<script>
import VSearchBox from '@/base/searchBox/searchBox';
import { getHotKey } from '@/api/search'
import VSuggest  from '@/components/suggest/suggest'
import { ERR_OK } from '@/api/config'
export default {
  name: 'search',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      hotKeyList: [],
      query:''
    }
  },
  components: {
    VSearchBox,
    VSuggest
  },
  created() {
    this._getHotKey()
  },
  methods: {
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
    selectHotKey(item){ //点击热门搜索词--通过点击获取组件里面的方法
      this.$refs.searchBox.selectHotKey(item.k)
    },
    onQueryChange(query){
      this.query = query
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
