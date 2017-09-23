<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back icon-fanhui iconfont"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="styleBgImage" ref="bgImageBox">
            <div class="play-wrapper" v-show="songList.length > 0" ref="playWrapper">
                <div class="play">
                    <i class="icon-play"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="filter" ref="filter"></div>
        </div>
        <!-- 高斯模糊 毛玻璃 层 -->
        <div class="bg-layer" ref="bgLayer"></div>
        <!-- 滚动层 -->
        <v-scroll 
        @scroll="scroll"
        :data="songList" 
        :probeType = "probeType"
        :listenScroll = "listenScroll"
        class="list"  ref="listBox"
        >
            <div class="song-list-wrapper">
                <v-song-list :song-list="songList" @select="selectItem">

                </v-song-list>
            </div>
            <div class="loading-container" v-show="!songList.length">
                <v-loading></v-loading>
            </div>

        </v-scroll>


    </div>
</template>
<script>

import VScroll from '@/base/scroll/scroll'
import VSongList from '@/base/songList/songList'
import VLoading from '@/base/loading/loading'
import { prefixStyle } from '@/common/js/dom' //通过浏览器机制进行添加前缀！
import {mapActions} from 'vuex'

// 层滚到顶部停住！距离顶部的距离！
const TRANSLATE_HEIGHT = 40; 

const transform = prefixStyle('transform');
const backdrop = prefixStyle('backdrop-filter');

console.log('transform', transform)
console.log('backdrop',backdrop)
export default {
    data() {
        return {
            scrollY: ''
        }
    },
    components:{
        VSongList,
        VScroll,
        VLoading
    },
    props: {
        songList: {
            type: Array,
            default: []
        },
        title: {
            type: String,
            default: ''
        },
        bgImage: {
            type: String,
            default: ''
        }

    },
    computed: {
        styleBgImage() {
            return `background-image:url(${this.bgImage})`
                
        }
    },
    created() {
        this.probeType = 3;
        this.listenScroll = true;
        
    },
    methods: {
        back() {
            this.$router.back();
        },
        scroll(site){
             this.scrollY = site.y;
             console.log(this.scrollY)
        },
        selectItem(item,index){ //点击歌曲列表播放
       
            this.selectPlay({
                list: this.songList,
                index
            })
        },
        ...mapActions([
            'selectPlay'
        ])
    },
    watch: {
        // 监听scrollY的滚动给bg-layer层设置滑动样式
        scrollY(newY) {
            let zIndex = 0;
            // 鼠标向下拉的时候顶部图片也向下拉通过transform:scale！
            /**
             * 1.设置一个percent百分比！通过newY对比背景图片的高度！
             * 2.设置图片的scale的白分比加percent
             * **/ 
            // 鼠标向上拉的时候顶部图片出现高斯模糊现象！
            /**
             * 1.backdrop-filter:blur(1.2px)!只在ios里面有效
             * **/ 
            
            let scale = 1; //下拉放大
            let percent = Math.abs(newY / this.bgHeight);
            let blur = 0; //上拉模糊
            if(newY > 0){ //下拉的时候
                
                scale = 1 + percent ;
                zIndex = 10;
                
            }else{
                
                blur = Math.min( 20,20 * percent)
                
            }        

            this.$refs.bgImageBox.style[transform] = `scale(${scale})` ;

            this.$refs.filter.style[backdrop] = `blur(${blur}px)` ;

            // Math.max(argument1,argument2) 返回最大的参数值
            let translateY = Math.max(this.scrollMaxY, newY);
            this.$refs.bgLayer.style[transform] = `translate3d(0,${translateY}px,0)`;


            // 当滑动到顶部40！背景图设置z-index！则列表为overflow：hidden样式！
            
            if(this.scrollMaxY < newY){ //还没滑动到顶部40
                 
                this.$refs.bgImageBox.style.height = 0;
                this.$refs.bgImageBox.style.paddingTop = `70%`;
                this.$refs.playWrapper.style.display = '';

            }else{ //滑动到顶部40!z-index显示！设置高度！

                zIndex = 10;
                this.$refs.bgImageBox.style.height = `${TRANSLATE_HEIGHT}px`
                this.$refs.bgImageBox.style.paddingTop = 0;
                 this.$refs.playWrapper.style.display = 'none';
            }

            this.$refs.bgImageBox.style.zIndex = zIndex

        }
    },
    mounted() {
        // 通过this.$refs是组件的时候通过$el获取原声对象
        this.bgHeight = this.$refs.bgImageBox.clientHeight;
        this.scrollMaxY = -this.bgHeight + TRANSLATE_HEIGHT;
        this.$refs.listBox.$el.style.top = `${this.bgHeight}px`
    }
}
</script>
<style lang="scss" scoped>
@import "~common/sass/variable";

.music-list {
    position: fixed;
    z-index: 100;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-background;
    .back {
        position: absolute;
        left: 6px;
        top: 0;
        z-index: 50;
        .icon-back {
            display: block;
            padding: 10px;
            font-size: $font-size-large-x;
            color: $color-theme;
        }
    }
    .title {
        position: absolute;
        top: 0;
        left: 10%;
        z-index: 40;
        width: 80%;
        text-align: center;
        line-height: 40px;
        font-size: $font-size-large;
        color: $color-text;
    }
    .bg-image {
        // css布局通过设置宽为100%；高为70%；达到10:7的效果
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 70%;
        transform-origin: top;
        background-size: cover;
        // z-index:30;
        .play-wrapper {
            position: absolute;
            bottom: 20px;
            z-index: 50;
            width: 100%;
            .play {
                box-sizing: border-box;
                width: 135px;
                padding: 7px 0;
                margin: 0 auto;
                text-align: center;
                border: 1px solid $color-theme;
                color: $color-theme;
                border-radius: 100px;
                font-size: 0;
                .icon-play {
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 6px;
                    font-size: $font-size-medium-x;
                }
                .text {
                    display: inline-block;
                    vertical-align: middle;
                    font-size: $font-size-small
                }
            }
        }
        .filter {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background:rgba(7, 17, 27, 0.4);
        }
    }
    .bg-layer {
        position: absolute;
        width:100%;
        height: 100%;
        background: $color-background;
    }
    .list {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background: $color-background;
        // overflow:hidden;
        .song-list-wrapper {
            padding: 20px 30px;
        }
        .loading-container {
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
</style>
