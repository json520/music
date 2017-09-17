<template>
  
    <scroll 
    @scroll="scroll"
    :listen-scroll="listenScroll"
    :probe-type="probeType"
    :data="data"
    class="singerListView"
    ref="singerListView"
    
      >
        <ul>
            <li class="list_group"  v-for="(items,indexs) in data" :key="indexs" ref="listGroup">
                <h2 class="list_group_title">{{items.title}}</h2>
                <ul>
                    <li class="list_group_item" @click="selectItem(item)" v-for="(item,index) in items.items" :key="index">
                        <img class="avatar" :src="item.avatar" alt="" />
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list_shortcur" @touchstart="onShortcurTouchStart" @touchmove="onShortcurTouchMove">
            <ul>
                <li v-for="(item,index) in letterList" :key="index" class="item"  
                :data-index="index"
                :class="{'current': currentIndex === index}"
                >
                    {{item}}        
                </li>
            </ul>
        </div>

        <!--歌手列表顶部  -->
        <div class="list_fixed" ref="fixed" v-show="fixedTitle">
            <div class="fixed_title">{{fixedTitle}}</div>
        </div>
        <div class="loading_container" v-show="!data.length">
            <loading></loading>
        </div>

    </scroll>
  
</template>
<script>
import Scroll from '@/base/scroll/scroll'
import { getAttr } from '@/common/js/dom'
import Loading from '@/base/loading/loading'

// 歌手顶部列表标题的高度
const TITLE_HEIGHT = 30
// 字母列表元素高度
const LETTER_HEIGHT = 18

export default {
  name: 'singerListView',
   data(){
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1
      }
  },
  components:{
      Scroll,
      Loading
  },
  created(){
      this.touch = {};
      this.listenScroll = true; //监听滚动事件
      this.probeType = 3; //设置probeType为3则在滚动动画中监听滚动事件
      //通过created创建对象！而不用data！因为data、props、computed都会在创建的变量里面添加set和ge用以监听数据对应dom的双向绑定！
      //touch只是一个计数！不用监听！
      this.listHeight = [] 
  },
  props:{
        data:{
            type: Array,
            default: []
        }
  },
  computed: {
    //   计算属性！通过传入的data进行处理获取右边的字母列表
       letterList (){
           return this.data.map((items) =>{
               return items.title.substring(0, 1);

           })
       },
       fixedTitle(){

           if(this.scrollY > 0){
               return ''
           }
           return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
       }

  },
 
  methods: {
      selectItem(singer){ //事件派发出去！让使用这个组件的人进行操作！
        this.$emit('select',singer)
      },
    //   监听touchStart事件，通过点击字母左边歌手滚动到对应的位置
    onShortcurTouchStart(event){
        let touchStartIndex = getAttr(event.target,'index')
        let firstChild = event.touches[0];

        this.touch.startIndex = touchStartIndex;
        this.touch.touchStartLen = firstChild.pageY;

        this._scrollTo(touchStartIndex)
    },
    onShortcurTouchMove(event){ //通过滚动字母左边歌手滚动到相应的位置
    // 实现原理！通过touchstart和touchemove的y轴的距离！对比字母直接的阕值！滚动到相应的位置！
        this.touch.touchMoveLen = event.touches[0].pageY;
        let value = (this.touch.touchMoveLen - this.touch.touchStartLen) / LETTER_HEIGHT | 0;
        let queValue = parseInt(this.touch.startIndex) + value;
       
        this._scrollTo(queValue)
    },
    scroll(site){ //获取滚动的y轴
        this.scrollY = site.y;
        // console.log(this.scrollY)
    },
    _scrollTo(index){ //？？？？？？？？？？？？？？不懂？？？？？？？？？？？？
        if(!index && index !== 0){
            return 
        }
        if(index < 0){
            index = 0
        } else if (index > this.listHeight.length - 2){
            index = this.listHeight.length - 2
        }
        
        this.scrollY = -this.listHeight[index];
        this.$refs.singerListView.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _calculateHeight(){ //计算歌手列表每个li距离顶部的高度
        this.listHeight = [];
        const list = this.$refs.listGroup;
        let height = 0;
        this.listHeight.push(height);
        for(let value of list){
            let liHeight = value.clientHeight;
            height += liHeight;
            this.listHeight.push(height)
        }
    },
  },
  watch: {
    /*
    数据监听
        第一个参数是新值，
        第二个参数是旧值
    */   
      data(){  //数据变化！重新计算li的高度
          setTimeout(() =>{
                this._calculateHeight();
          },20)
      },
      scrollY(newY){ //监听滚动的数据
      
        const listHeight = this.listHeight;
        //  滚动到顶部
        if(newY > 0){
            this.currentIndex = 0;
            return 
        }
        // 滚动到中间
        for(let i = 0; i < listHeight.length -1 ; i++){
            let height1 = listHeight[i];
            let height2 = listHeight[i+1];
            if(-newY >= height1 && -newY < height2){
                this.currentIndex = i;
                this.diff = height2 + newY;
                
                return 
            }       

        }
        // 滚动到底部,且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length -2 
      },
      diff(newVal){
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if(this.fixedTop === fixedTop){
            return
        };
        this.fixedTop = fixedTop;
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`

      }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/sass/variable";

.singerListView{
    position:relative;
    width:100%;
    height: 100%;
    overflow: hidden;
    background:$color-background;
    .list_group{
        padding-bottom:30px;
        .list_group_title{
            height: 30px;
            line-height:30px;
            padding-left:20px;
            font-size:$font-size-small;
            color: $color-text-l;
            background: $color-highlight-background;
           
        }
        .list_group_item{
            display: flex;
            align-items:center;
            padding:20px 0 0 30px;
            .avatar{
                width:50px;
                height: 50px;
                border-radius:50%；
            }
            .name{
                margin-left:20px;
                color: $color-text-l;
                font-size: $font-size-medium
            }
        }
    }
    .list_shortcur{
        position: absolute;
        z-index: 30;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width:20px;
        padding:20px 0;
        border-radius:10px;
        text-align:center;
        background: $color-background-d;
        font-family: Helvetica;
        .item{
            padding: 3px;
            line-height:1;
            color: $color-text-l;
            font-size: $font-size-small;
            &.current{
                color: $color-theme;
            }
        }
    }
    .list_fixed{
        position: absolute;
        left: 0;
        top:0;
        width:100%;
        .fixed_title{
            height:30px;
            line-height:30px;
            padding-left:20px;
            font-size: $font-size-small;
            color: $color-text-l;
            background: $color-highlight-background;

        }
    }
    .loading_container{
        position: absolute;
        width:100%;
        top:50%;
        transform: translateY(50%);
    }
}
</style>
