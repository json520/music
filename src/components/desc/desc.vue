<template>
  <transition name="slide">
    <v-music-list :title="title" :bgImage="bgImage"></v-music-list>

  </transition>
</template>
<script>
import VMusicList from '@/components/musicList/musicList'
import {mapGetters} from 'vuex'
import {getSongList} from '@/api/recommend'
import {ERR_OK} from '@/api/config'
export default {
  name: "desc",
  data() {
    return {

    };
  },
  created() {

    this._getSongList()
  },
  computed:{
    title(){
      return this.desc.dissname
    },
    bgImage(){
      return this.desc.imgurl
    },
    ...mapGetters([
      'desc'
    ])
  },
  components: {
    VMusicList
  },
  methods:{
    _getSongList(){
        if(!this.desc.dissid){
          this.$router.push({
            path: '/recommend'
          })
          return 
        }

      getSongList(this.desc.dissid).then((res) =>{
        if(res.code === ERR_OK){
          console.log('为0')
        }
         console.log('数据',res) 
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0)
}
</style>