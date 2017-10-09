<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text"></h1>
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine iconfont icon-xin"></i>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "myHeader",
  data () {
    return {
    };
  }
}
</script>
<style lang="scss" scoped>
@import "~common/sass/variable";
@import "~common/sass/mixin";

.m-header{
  position: relative;
  height: 44px;
  text-align: center;
  color: $color-theme;
  font-size: 0;
  .icon{
    display: inline-block;
    vertical-align: top;
    margin-top: 6px;
    width: 50px;
    height: 32px;
    margin-right: 9px;
    @include bg-image('logo');
    background-size: 50px 32px;
    background-repeat: no-repeat;
  }
  .text{
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: $font-size-large;
  }
  .mine{
    position: absolute;
    top: 0;
    right: 0;
    .icon-mine{
      display: block;
      padding: 12px;
      font-size: 20px;
      color: $color-theme;
    }
  }
}
</style>