<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(item, index)" v-for="(item,index) in songList" :key="index" class="item">
        <div class="rank" v-show="rank">
          <span :class="getRankIcon(index)">{{getRankText(index)}}</span>
        </div>
        <div class="content">
          <h1 class="name">{{item.name}}</h1>
          <p class="desc">{{getDescr(item)}}</p>
        </div>
      </li>
    </ul>

  </div>
</template>
<script>
export default {
  name: "component_name",
  data() {
    return {

    };
  },
  props: {
    songList: {
      type: Array,
      default: []
    },
    rank:{
      type: Boolean,
      default: false
    }
  },
  methods: {
    getDescr(song) {
      return `${song.singer} - ${song.album}`
    },
    selectItem(item, index) {
      this.$emit('select', item, index);
    },
    getRankIcon(index) {
      if(index > 2){
        
        return 'text'
      }else{
        return `icon icon${index}`
      }
    },
    getRankText(index){
      if(index >2){
        return index+1
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/sass/variable";
@import "~common/sass/mixin";

.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;
    .rank {
      flex: 0 0 25px;
      width: 25px;
      margin-right: 30px;
      text-align: center;
      .icon {
        display: inline-block;
        width: 25px;
        height: 24px;
        background-size: 25px 24px;
        &.icon0 {
          @include bg-image('first')
        }
        &.icon1 {
          @include bg-image('second')
        }
        &.icon2 {
          @include bg-image('third')
        }
      }
      .text {
        color: $color-theme;
        font-size: $font-size-large;
      }
    }
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      text-align: start;
      .name {
        @include no-wrap;
        color: $color-text;
        font-size: $font-size-large;
      }
      .desc {
        @include no-wrap;
        margin-top: 4px;
        color: $color-text-d;
      }
    }
  }
}
</style>