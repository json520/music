<template>
  <div class="progress-circle">
    <!-- 
      1.通过circle标签画出原型！
      2.通过svg的宽高设置圆的大笑
      3.通过stroke-dasharray设置圆的总偏移量
      4.通过stroke-dashoffset设置圆的偏移量
     -->
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1"
     xmlns="http://www.w3.org/2000/svg">
      
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" /> 
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" 
      :stroke-dasharray="dasharray" :stroke-dashoffset="dashoffset" />

    </svg>
    <slot> </slot>
  </div>
</template>
<script>
export default {
  name: "progressCircle",
  props:{
    radius: { //圆的整个的宽高
      type: Number,
      default: 100
    },
    percent: { //百分比，圆圈的进度条，越小越实心
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // 圆的周长=2πR
      dasharray: Math.PI * 2 * 50 
    };
  },
  computed: {
    dashoffset() {
      return ( 1 - this.percent) * this.dasharray;
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/sass/variable";

.progress-circle{
  position: relative;
  circle{
    stroke-width: 8px;
    transform-origin: center;
    &.progress-background{
      transform: scale(0.9);
      stroke: $color-theme-d;
    }
    &.progress-bar{
      transform: scale(0.9) rotate(-90deg);
      stroke: $color-theme;
    }
  }
}
</style>