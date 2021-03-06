/**外部获取数据
 * 第一个state是传入的参数，第二个是返回的数据
 * **/
export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playList = state => state.playList

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

// 由于最后的数据里面在计算属性里面！但是需要通过playList和currentIndex获取到对应的song

export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}

export const desc = state => state.desc  

export const topList = state => state.topList

export const searchHistory = state => state.searchHistory   //搜索記錄

export const playHistory = state => state.playHistory  //最近播放列表

export const favoriteList = state => state.favoriteList //收藏列表