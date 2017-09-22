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
  return state.playing[state.currentIndex] || {}
}