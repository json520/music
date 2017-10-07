<template>
  <div class="search-list" v-show="searches.length">
    <transition-group name="list" tag="ul" :style="{textAlign:'start'}">
      <li class="search-item" @click="selectItem(item)" v-for="(item,index) in searches" :key="index">
        <span class="text">{{item}}</span>
         <!-- click.stop防止冒泡 -->
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="icon-delete iconfont icon-xin"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: "searchList",
  props:{
    searches:{
      type: Array,
      default: []
    }
  },
  data () {
    return {
    };
  },
  methods: {
    selectItem(item) {
        this.$emit('select', item)
     },
     deleteOne(item) {
       this.$emit('delete', item)
     }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/sass/variable";

.search-item{
  .search-item{
    display: flex;
    align-items: center;
    height: 40px;
    overflow: hidden;
    &.list-enter-active,&.list-leave-active{
      transition: all 0.1s;
    }
    &.list-enter,&.list-leave-to{
      height: 0;
    }
    .text{
        flex: 1;
        color: $color-text-l;
    }
    .icon{
      // @include extend-click();
      .icon-delete{
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }
  }
}
</style>