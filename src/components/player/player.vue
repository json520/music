<template>
  <div class="player" v-if="playList.length > 0">
    <transition name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >

      <div class="normal-player" v-show="fullScreen" ref="normalPlayer">

        <div class="background">
          <img :src="currentSong.image" style="width:100%;height:100%;" />
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back icon iconfont icon-fanhui"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd">
                <img class="image" :src="currentSong.image" />
              </div>
            </div>
          </div>
          <div class="lyric-wrapper">
            <div>
              <p></p>
            </div>
          </div>
        </div>
        <div class="bottom">
          <!-- <div class="dot-wrapper">
                  <span class="dot"></span>
                  <span class="dot"></span>
                </div> -->
          <div class="progress-wrapper">
            <span class="time time-l"></span>
            <div class="progress-bar-wrapper">

            </div>
            <span class="time time-r"></span>
          </div>
          <div class="operators">
            <div class="icon i-left iconfont icon-xunhuan">
              <i></i>
            </div>
            <div class="icon i-left iconfont icon-shape">

            </div>
            <div class="icon i-center iconfont icon-kaishi">

            </div>
            <div class="icon i-right iconfont icon-shape icon-shape2">

            </div>
            <div class="icon i-right iconfont icon-xin1">

            </div>

          </div>
        </div>
      </div>

    </transition>
    <transition name="mini">

      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img :src="currentSong.image" style="width:40px;height:40px;" />
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <i class="icon-mini iconfont icon-zanting"></i>
        </div>
        <div class="control">
          <i class="icon-playlist iconfont icon-suiji"></i>
        </div>
      </div>

    </transition>

  </div>
</template>
<script>

import { mapGetters, mapMutations } from 'vuex'
import animations from 'create-keyframe-animation'
import {prefixStyle} from '@/common/js/dom'
const transform = prefixStyle('transform')

console.log('animations', animations)
export default {
  name: "player",
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters([
      'fullScreen',
      'playList',
      'currentSong'
    ])
  },
  methods: {
    back() { //切换播放器全屏或min形
      let togglePlayer = !this.fullScreen;
      
      console.log('togglePlayer',togglePlayer)
      console.log(this.$refs.normalPlayer)
      // this.$refs.normalPlayer.style.display = 'none'
      this.setFullScreen(false)
      
      // 动画设置有问题
    },
    open() {
      // alert(1)
      this.setFullScreen(true)
    },
    enter(el, done) {
      //el是dom元素！done是完成后
      /*
      当只用 JavaScript 过渡的时候， 在 enter 和 leave 中，回调函数 done 是必须的 。
      否则他们会被同步调用，过渡会立刻完成
      */
      
      const {x, y, scale } = this.getSiteAndScale();
      console.log(x,y,scale)
      // 定义动画
      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transfrom: `translate3d(0,0,0) scale(1)`
        }
      }

      animations.registerAnimation({ //注册动画
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })

      animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter() {

      animations.unregisterAnimation('move');  //注销动画
      this.$refs.cdWrapper.style.animation = ''
    },
    leave(el, done) {
      // 直接用js设置transition原路返回！不用在设置animations
      /**
       * 1.设置初始的transition
       * 2.设置translate3d
       * 3.当transition过渡完的时候执行done!
       * **/ 
      const {x,y,scale} = this.getSiteAndScale();
      console.log(x,y,scale)
      this.$refs.cdWrapper.style.transition = `all 0.4s`;
      this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
      this.$refs.cdWrapper.addEventListener('transitionend',done)

    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style[transform] = ''
      // 设置cdWrapper的transition和transform为空
    },
    getSiteAndScale() { //获取mini到normal的时候normal的最终位置
      const miniCDWidth = 40;
      const miniCDLeft = 40;
      const miniCDBottom = 30;
      const normalCDTop = 80;
      const normalWidth = window.innerWidth * 0.8;
      const scale = miniCDWidth / normalWidth;
      const x = - (window.innerWidth / 2 - miniCDLeft);
      const y = window.innerHeight - normalCDTop - normalWidth / 2 - miniCDBottom;
      return {
        x,
        y,
        scale
      }

    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    })
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
@import "~common/sass/variable";
@import "~common/sass/mixin";

.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    toP: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;
    
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
        .icon-back {
          display: block;
          padding: 9px;
          font-size: $font-size-large-x;
          color: $color-theme;
          transform: rotate(-90deg);
        }
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-wrap;
        font-size: $font-size-large;
        color: $color-text;
      }
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 10px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            &.play {
              animation: rotate 20s liner infinite
            }
            &.pause {
              animation: rotate 20s liner infinite
            }
            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;
          .playing-lyric {
            height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }
      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
            &.current {
              color: $color-text;
            }
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;
          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
      .operators {
        display: flex;
        align-items: center;
        .icon {
          font-size: 30px;
          flex: 1;
          color: $color-theme;
          &.disable {
            color: $color-theme-d;
          }
          i {
            font-size: 30px;
          }
        }
        .i-left {
          text-align: right;
        }
        .i-center {
          padding: 0 20px;
          text-align: center;
          i {
            font-size: 40px;
          }
        }
        .i-right {
          text-align: left;
        }
        .icon-favorite {
          color: $color-sub-theme;
        }
        .icon-shape2 {
          transform: rotate(-180deg) translateY(3px);
          margin-right: 10px;
          text-align: right;
          vertical-align: middle;
        }
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.4s;
      .top,.bottom {
        // 贝塞尔曲线
        // transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
        // -webkit-transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }
    &.normal-enter,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 101;
    width: 100%;
    height: 60px;
    background: $color-highlight-background;
    &.mini-enter-active,
    &.mini-leave-active {
      transition: all 0.4s;
    }
    &.mini-enter,
    &.mini-leave-to {
      opacity: 0;
    }
    .icon {
      flex: 0 0 40px;
      width: 40px;
      padding: 0 10px 0 20px;
      img {
        border-radius: 50%;
        &.play {
          animation: rotate 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        margin-bottom: 2px;
        @include no-wrap;
        font-size: $font-size-medium;
        color: $color-text;
      }
      .desc {
        @include no-wrap;
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }
    .control {
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;
      .icon-play-mini,
      .icon-pause-mini,
      .icon-playlist {
        font-size: 30px;
        color: $color-theme-d;
      }
      .icon-mini {
        color: $color-theme-d;
        font-size: 32px;
        position: absolute;
        right: 40px;
        top: 10px;
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>