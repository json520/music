<template>
  
    <scroll :data="data" class="singerListView" >

        <ul>
            <li class="list_group" v-for="(items,indexs) in data" :key="indexs">
                <h2 class="list_group_title">{{items.title}}</h2>
                <ul>
                    <li class="list_group_item" v-for="(item,index) in items.items" :key="index">
                        <img class="avatar" :src="item.avatar" alt="" />
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>

    </scroll>
  
</template>
<script>
import Scroll from '@/base/scroll/scroll'
export default {
  name: 'singerListView',
  components:{
      Scroll
  },
  props:{
        data:{
            type: Array,
            default: []
        }
  },
  data(){
      return {
        
      }
  },
  created(){

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
            line-height:1px;
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
