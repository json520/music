<template>
  <div class="progress-bar" ref="progressBar"
    @touchstart.prevent="progressTouchStart"
    @touchmove.prevent="progressTouchMove"
    @touchend.prevent="progressTouchEnd"
    @click="progressClick"
  >
    <div class="bar-inner" >
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper">

        <div class="progress-bth" ref="progressBtn"></div>
      </div>

    </div>
  </div>
</template>
<script>

const progressBtnWidth = 16;
const ProgressBtnLeft = 7;
import { prefixStyle } from '@/common/js/dom'

const transform = prefixStyle('transform')
export default {
  name: "progressBar",
  data() {
    return {

    };
  },
  props: {
    percent:{
      type: Number,
      default: 0
    }
  },
  watch: {
    percent(newVal) {
      if(newVal >= 0 && !this.touch.initStart){ //错误在this.$refs.progressBar写成 this.refs.progressBar
        // 计算滚动的容器宽度 * 播放的百分比
        
        const progressWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
        const offsetWidth = newVal * progressWidth;
        this._setProgressWidth(offsetWidth);
        
      }
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
      // 触摸初始的时候！获取手指的起始位置和静读条的起始位置！设置一个初始化Boolean值 ！
      //触摸的时候！如果没有初始化则取消！获取两个数值之间的差值！然后给进度条和小球赋值！
      //触摸结束的时候！初始化设置为false!
      progressTouchStart(e) {
        this.touch.initStart = true;
        this.touch.startX = e.touches[0].pageX; //获取初始位置！touch[0]代表第一个手指！
        this.touch.progressX = this.$refs.progress.clientWidth;
      },
      progressTouchMove(e) {
        if(!this.touch.initStart){
          return
        }
        const diffWidth = e.touches[0].pageX -  this.touch.startX;
        const offsetWidth = Math.min( this.$refs.progressBar.clientWidth - progressBtnWidth,Math.max(0,diffWidth + this.touch.progressX))
        this._setProgressWidth(offsetWidth)
      },
      progressTouchEnd() {
        this.touch.initStart = false;
        this._triggerPercent();

      },
      _triggerPercent() {
         // 触摸结束后！小球不能定位到拖动的位置！只能改变audio的播放时间！
        const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
        const percent = this.$refs.progress.clientWidth / progressBarWidth;
        this.$emit('progressChange',percent)
      },
      _setProgressWidth(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        // 进度条小球的进度用transform做！为了过渡更加顺畅；
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
      },
      progressClick(e) { //点击移动进度条
      // e.offsetX 偏移量
      const rect = this.$refs.progressBar.getBoundingClientRect();  //
      const offsetWidth = e.pageX - rect.left;

        this._setProgressWidth(offsetWidth);
        this._triggerPercent();
      }
  },
  mounted() {

  }

}
</script>
<style lang="scss" scoped>
@import "~common/sass/variable";

.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-bth {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
        
      }
    }
  }
}
</style>