<template>
  <div class="switches">
    <li class="switch-item" 
      v-for="(item,index) in button" :key="index" 
      :class="{'active': currentIndex === index}"
      @click="selectItem(index)"
      >

      <span >{{item.name}}</span>
    </li>
  </div>
</template>
<script>
export default {
  name: "switches",
  data () {
    return {

    };
  },
  props: {
    button: {
      type: Array,
      default: []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    selectItem(index) {
      this.$emit('select',index)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/sass/variable";
.switches{
  display: flex;
  align-items: center;
  width: 240px;
  margin: 0 auto;
  border: 1px solid $color-highlight-background;
  border-radius: 5px;
  .switch-item{
    flex: 1;
    padding: 8px;
    text-align: center;
    font-size: $font-size-medium;
    color: $color-text-d;
    &.active{
      background: $color-highlight-background;
      color: $color-text;
    }
  }
}
</style>