<template>
<!--自定义组件用slot设置  -->
    <div class="slider" ref="slider">
        <div class="slider_group" ref="sliderGroup">
            <slot>

            </slot>
        </div>
        <!--分页器  -->
        <div class="dots">
            <span class="dot" :class="{active:currentPageIndex === index}" v-for="(item,index) in dotList" :key="index"></span>
        </div>
    </div>
</template>
<script>
    import { addClass }  from '@/common/js/dom'
    import BScroll from 'better-scroll'
export default {
  name:'slider',
  props:{ //通过此参数在父子组件之间传递数据
    loop:{
        type: Boolean,
        default: true
    },
    autoplay:{
        type:Boolean,
        default:true
    },
    interval:{
        type: Number,
        default: 4000
    },
    click:{
        type:Boolean,
        default:true
    }
  },
  data(){
      return {
        dotList:[],
        currentPageIndex:0
      }
  },
  mounted(){
        //设置slider的宽度
        setTimeout(()=>{
            this._setSliderWidth();
            this._initDots();
            this._initSlider();
            
            if(this.autoplay){
                this._play()
            }
        },20)
        // 当窗口尺发生变化时候，重置slider
        window.addEventListener('resize',()=>{
            if(!this.slider){
                return
            }else{
                this._setSliderWidth(true);
                this.slider.refresh();
            }
        })
     
  },
  methods:{
        _setSliderWidth(Resize){
            // 获取slierGroup下面的子元素，设置宽度，并给自己也设置宽度
            this.children = this.$refs.sliderGroup.children;
            let width = 0;
            let sliderWidth = this.$refs.slider.clientWidth;
            for(let value of this.children){
                addClass(value,'slider_item')
                value.style.width  = sliderWidth + 'px'
                width += sliderWidth
            }
            // 如果是loop会在前后都加一个slider！所以宽度要加2
            if(this.loop && !Resize){
                width += 2 * sliderWidth
            }
            this.$refs.sliderGroup.style.width = width + 'px'

        },
        _initSlider(){
            this.slider = new BScroll(this.$refs.slider,{
                scrollX: true, //左右滑动
                scrollY: false, //上下滑动
                momentum: false,
                snap: {
                    loop : this.loop,
                    threshold: 0.3, //slider的阈值，滑动超过这个值就切换到下一页
                    speed: 400 //切换到下一页的用时
                },
                click:this.click
            })
            this.slider.on('scrollEnd',()=>{
                let pageIndex = this.slider.getCurrentPage().pageX;
               
                    
                    if (this.loop) {
                        pageIndex -= 1
                    }
                    this.currentPageIndex = pageIndex
                    if(this.autoplay){
                        clearTimeout(this.timer);
                        this._play()
                    }

            })            


        },
        _initDots(){
            this.dotList = new Array(this.children.length)
        },
        _play(){
            let pageIndex = this.currentPageIndex + 1;
            if(this.loop){
                pageIndex += 1;
            }

            this.timer = setTimeout(()=>{
                
                this.slider.goToPage(pageIndex,0,400)
            },this.interval)
        }
  },
  destroyed(){
      clearTimeout(this.timer)
  }
}
</script>
<style lang="scss" scoped>
    .slider{
        min-height:1px;
        position:relative;
        .slider_group{
            position:relative;
            overflow:hidden;
            white-space:nowrap;
            .slider_item{
                float:left;
                box-sizing:border-box;
                overflow:hidden;
                text-align:center;
                a{
                    display:block;
                    width:100%;
                    overflow:hidden;
                    text-decoration:none;
                    img{
                        display:block;
                        width:100%;
                    }

                }

            }
        }
        .dots{
            position:absolute;
            right:0;
            left:0;
            bottom:12px;
            text-align:center;
            font-size:0;
            .dot{
                display:inline-block;
                margin:0 4px;
                width:8px;
                height:8px;
                border-radius:50%;
                background:white;
            }
            .dot.active{
                width:20px;
                border-radius:5px;
                background:red;
            }
        }
    }
</style>
