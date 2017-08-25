<template>
<!-- 滚动组件 -->
      <div class="scroll" ref="wrapper">
          <slot>

          </slot>
      </div>

</template>
<script>
import BScroll from 'better-scroll'
export default{
    props:{
        probeType:{ //当为1时候，会在屏幕滚动停止的时候派发scroll事件
            type:Number,
            default:1
        },
        click:{
            type:Boolean,
            default:true
        },
        data:{
            type:Array,
            default:null
        }
    },
    data(){
        return{

        }

    },
    mounted(){
        setTimeout(() =>{
            this._initScroll()
        },20)
    },
    methods:{
        _initScroll(){
            if(!this.$refs.wrapper){
                return 
            }else{
                this.scroll = new BScroll(this.$refs.wrapper,{
                    probeType:this.probeType,
                    click:this.click
                })
            }
        }
    },
    enable(){
        this.scroll && this.scroll.enable();
    },
    disable(){
        this.scroll && this.scroll.disable();
    },
    refresh(){
        this.scroll && this.scroll.refresh();
    },
    watch: {
        data(){
            alert(2)
            setTimeout(()=>{
                this.scroll.refresh();
            },20)
        }
    }
}

</script>
<style scoped>

</style>