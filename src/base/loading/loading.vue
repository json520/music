<template>
<!-- 加载图片组件 -->
    <div class="loading">
        <div class="loading_box">
            <img src="./loading.gif" />
        </div>
        <p class="loading_text">{{title}}</p>
    </div>
</template>
<script>
export default{
    name: 'loading',
    props:{
        title:{
            type: String,
            default: '正在载入...'
        }
    },
    data(){
        return {
            
        }
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
@import "~common/sass/variable";

.loading{
    width:100%;
    text-align:center;
    img{
        display:inline-block;
        width:20px;
    }
    .loading_text{
        line-height:20px;
        font-size:$font-size-small;
        color: $color-text-l;
        display:inline-block;
    }
}
</style>