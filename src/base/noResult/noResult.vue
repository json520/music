<template>
  <div class="no-result">
    <div class="no-result-img">
      <img src="./logo.png" />
    </div>
    <p class="no-result">{{title}}</p>
  </div>
</template>
<script>
export default {
  name: "noResult",
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      
    };
  }
}
</script>
<style lang="scss" scoped>
@import '~common/sass/variable';
.no-result{
  // position: absolute;
  // width:100%;
  // height:100%;
  // top: 0;
  // bottom: 0;
  // left: 0;
  // right: 0;
  // margin: auto;
  // z-index: 1;
  text-align:center;
  .no-result-img{
    text-align:center;
    display:inline-block;
    img{
      width:50px;
    }
  }
  .no-result{
    font-size:14px;
    color:$color-text-d;
  }
}
</style>