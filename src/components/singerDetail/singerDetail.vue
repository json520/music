<template>
<transition name="slide">

        <div class="singer-detail">
    11
        </div>
    </transition>
</template>
<script >
import { mapGetters } from 'vuex'
import { getSingerDetail } from '@/api/singer'
import { createSong } from '@/common/js/song'
import {ERR_OK} from '@/api/config'

export default {
  name:'singer-detail',
  data(){   
      return {
        songList: []
      }
  },
  computed: {
      ...mapGetters([
          'singer'
      ])
  },
  created() {
      console.log(this.singer)
      this._getAjaxSingerDetail();
  },
  methods: {
      _getAjaxSingerDetail() {

        if(!this.singer.id){
            this.$router.push({
                paht: '/singer'
            })
        };
        getSingerDetail(this.singer.id).then((res) =>{
            
            if(res.code === ERR_OK){
                this.songList = this._formateSongList(res.data.list)
                console.log(this.songList)
            }

        }).catch((err) =>{

        })

      },
      _formateSongList(data){
            let box = [];
            data.forEach((item) =>{
                let {musicData } = item;
                if(musicData.songid && musicData.albummid){
                    // 创建自己使用的对象
                    box.push(createSong(musicData))
                }
            })
            return box;
      }
  }
}
</script>
<style lang="scss" scoped >
@import '~common/sass/variable';

.singer-detail{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index:100;
    background: $color-background;

}
.slide-enter-active,.slide-leave-active{
    transition: all 0.3s;
}
.slide-enter, .slide-leave-to{
    transform: translate3d(100%,0,0);
}

</style>
