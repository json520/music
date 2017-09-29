<template>
  <transition name="slide">
    <v-music-list :title="title" :bgImage="bgImage" :songList="songList" :rank="rank">213</v-music-list>
  </transition>
</template>
<script>
import VMusicList from '@/components/musicList/musicList'
import { mapGetters } from 'vuex'
import { getTopListCp } from '@/api/rank'
import { ERR_OK } from '@/api/config'
import {createSong} from '@/common/js/song'
export default {
  name: "topList",
  data() {
    return {
      songList: [],
      rank: true
    };
  },
  created() {
     this._getTopListCp();
  },
  computed: {
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      if(this.songList.length){
        return this.songList[0].image
      }
      return this.topList.picUrl
    },
    ...mapGetters([
      'topList'
    ])
  },
  components: {
    VMusicList
  },
  methods: {
    _getTopListCp() {
      if(!this.topList.id){
        this.$router.push({
          path: '/rank'
        })
        return 
      }

      getTopListCp(this.topList.id).then((res) => {
        if (res.code === ERR_OK) {
          
          this.songList = this._normalizeSongs(res.songlist)
          console.log(this.songList)
        }

      }).catch((err) => {
        console.log(err)
      })
    },
    _normalizeSongs(list){
      let ret = [];
      list.forEach((item,index) =>{
        const musicData = item.data;
        if(musicData.songid && musicData.albummid){
          ret.push(createSong(musicData))
        }
      })
      return ret;
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