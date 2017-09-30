<template>
  <div class="search-box">
    <i class="icon-search icon-shape iconfont"></i>
    <input class="box" type="text" v-model="query" :placeholder="placeholder">
    <i class="icon-dismiss icon-xin iconfont" v-show="query" @click="clear"></i>
  </div>
</template>
<script>
export default {
  name: "search-box",
  data() {
    return {
      query: ''
    };
  },
  props: {
    placeholder: {
      type: String,
      default: '搜索歌名、歌手'
    }
  },
  created() {
    this.$watch('query', (newVal, oldVal) => {
      this.$emit('query', newVal)
    })
  },
  methods: {
    clear() {
      this.query = ''
    },
    selectHotKey(query) {
      this.query = query
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/sass/variable";
.search-box {

  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 40px;
  background: $color-highlight-background;
  border-radius: 6px;
  .icon-search {
    font-size: 24px;
    color: $color-background;
  }
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: $color-highlight-background;
    color: $color-text;
    font-size: $font-size-medium;
    &::placeholder {
      color: $color-text-d;
    }
    .icon-dismiss {
      font-size: 16px;
      color: $color-background;
    }
  }
}
</style>