<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>

        <div class="list-header">
          <h1 class="title">
            <i class="icon iconfont icon-xin"></i>
            <span class="text"></span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear iconfont icon-xin"></i>
            </span>
          </h1>
        </div>
      <!-- 因为transition-group动画渲染大概要100ms之后才能计算高度！所以需要传入更新的时间refreshDelay -->
      <v-scroll class="list-content" :data="sequenceList" :refreshDelay="refreshDelay" ref="listContent">
      <!-- transition-group子元素需要添加key -->
        <transition-group name="list" tag="ul">
          <li class="item" ref="item" v-for="(item,index) in sequenceList" :key="index" @click="selectItem(index,item)">
            <i class="current iconfont" :class="getCurrentICon(item)"></i>
            <span class="text">{{item.name}}</span>
            <span class="like">
              <i class="icon-favorite iconfont icon-xin"></i>
            </span>
            <span class="delete" @click="deleteOne(item)">
              <i class="icon-delete iconfont icon-bofang"></i>
            </span>
          </li>
        </transition-group>
        
      </v-scroll>

      <div class="list-operate">
        <div class="add" @click="showAddSong">
          <i class="icon-add iconfont icon-xin"></i>
          <span class="text">添加歌曲到列表</span>
        </div>
      </div>
      
      <div class="list-close" @click="hide">
        <span>关闭</span>
      </div>

      </div>

      <!-- 弹窗 -->
      <v-confirm ref="confirm" text="是否清空播放列表" confirmBtnText="清空" @confirm="_confirm"></v-confirm>

      <v-add-song ref="addSong"></v-add-song>
    </div>
  </transition>
</template>
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import VScroll from '@/base/scroll/scroll'
import VConfirm from '@/base/confirm/confirm'
import VAddSong from '@/components/addSong/addSong'
import {playMode} from '@/common/js/config'
export default {
  name: "playList",
  data () {
    return {
      showFlag: true,
      refreshDelay: 100
    };
  },
  components:{
    VScroll,
    VConfirm,
    VAddSong
  },
  computed:{
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'mode'
    ])
  },
  methods: {
    showAddSong() {
      this.$refs.addSong.show();
    },
    show() {
      this.showFlag = true;
      setTimeout(()=>{
        this.$refs.listContent.refresh();
      },20)
    },
    hide() {
      this.showFlag = false;
    },
    getCurrentICon(item){
      if(item.id === this.currentSong.id){
        return 'icon-xin'
      }
      return ''
    },
    selectItem(index,item){ //播放歌曲
      if(this.mode === playMode.random){
        index = this.sequenceList.findIndex((song) =>{
          return song.id === item.id
        })
      }
      
      this.setCurrentIndex(index);
      this.setPlaying(true)
    },
    scrollToCurrent(current) { //滚动到当前播放的歌曲列表
      let index = this.sequenceList.findIndex((song) =>{
        return song.id === current.id
      })

      this.$refs.listContent.scrollToElement(this.$refs.item[index],300)

    },
    deleteOne(item) {
      this.deleteSong(item)

      if(!this.playList.length){
        this.hide();
      }

    },
    showConfirm() {
      this.$refs.confirm.show();
    },
    _confirm() { //确定清空所有列表
      this.deleteSongList();
      this.hide();
    },
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlaying: 'SET_PLAYING'
    }),
    ...mapActions({
      deleteSong: 'deleteSong',
      deleteSongList: 'deleteSongList'
    })
  },
  watch: {
    currentSong(newVal,oldVal) {  //监听列表改变滚动
      if(!this.showFlag || newVal.id === oldVal.id) {
        return 
      }
      this.scrollToCurrent(newVal)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/sass/variable";
@import "~common/sass/mixin";

.playlist{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: $color-background-d;
  &.list-fade-enter-active,&.list-fade-leave-active{
    transition: opacity 0.3s;
    .list-wrapper{
      transition: all 0.3s;
    }
  }
  &.list-fade-enter,&.list-fade-leave-to{
    opacity: 0;
    .list-wrapper{
      transform: translate3d(0, 100%, 0)
    }
  }
  &.list-fade-enter{

  }
  .list-wrapper{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: $color-highlight-background;
    .list-header{
      position: relative;
      padding: 20px 30px 10px 20px;
      .title{
        display: flex;
        align-items: center;
        .icon{
          margin-right: 10px;
          font-size: 30px;
          color: $color-theme-d;
        }
        .text{
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-l;
        }
        .clear{
          @include extend-click();
          .icon-clear{
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }
    .list-content{
      max-height: 240px;
      overflow: hidden;
      .item{
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;
        &.list-enter-active,&.list-leave-active{
          transition: all 0.1s;
        }
        &.list-enter,&.list-leave-to{
          height: 0;
        }
        .current{
          flex: 0 0 20px;
          width: 20px;
          font-size: $font-size-small;
          color: $color-theme-d;
        }
        .text{
          flex: 1;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text-d;
        }
        .like{
          @include extend-click();
          margin-right: 15px;
          font-size: $font-size-small;
          color: $color-theme;
          .icon-favorite{
            color: $color-sub-theme;
          }
        }
        .delete{
          @include extend-click();
          font-size: $font-size-small;
          color: $color-theme;
        }

      }
    }
    .list-operate{
      width: 140px;
      margin: 20px auto 30px auto;
      .add{
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border: 1px solid $color-text-l;
        border-radius: 100px;
        color: $color-text-l;
        .icon-add{
          margin-right: 5px;
          font-size: $font-size-small-s;
        }
        .text{
          font-size: $font-size-small;
        }
      }
    }
    .list-close{
      text-align: center;
      line-height: 50px;
      background: $color-background;
      font-size: $font-size-medium-x;
      color: $color-text-l;
    }
  }
}
</style>