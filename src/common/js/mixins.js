// vue的公共方法！可以和其他组件里面的方法共同合并！

import { mapGetters} from 'vuex'

export const playListMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  activated() { //当keep-alive切换的时候触发
    this.handlePlayList(this.playList)
  },
  mounted() {
    this.handlePlayList(this.playList)
  },
  watch: {
    playList(newVal){
      this.handlePlayList(newVal)
    }
  },
  methods: {
    handlePlayList(){
      throw new Error('must to be doing handlePlayList')
    }
  }
}