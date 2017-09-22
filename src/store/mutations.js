// 存储mutation
// 把mutationsTypes里面所有的常量以types代替使用
//修改state！只能在mutations里面修改sata数据！
import * as types from './mutationsTypes'

const mutations = {
    [types.SET_SINGER](state, singer) {
        state.singer = singer
    },
    [types.SET_PLAYING](state, playing) {  //playing传入的参数是Boolean
        state.playing = playing
    },
    [types.SET_FULL_SCREEN](state, fullScreen) { //fullScreen传入的类型是Boolean
        state.fullScreen = fullScreen
    },
    [types.SET_PLAY_LIST](state, playList) {
        state.playList = playList
    },
    [types.SET_SEQUENCE_LIST](state, sequenceList) {
        state.sequenceList = sequenceList
    },
    [types.SET_MODE](state, mode) {
        state.mode = mode
    },
    [types.SET_CURRENT_INDEX](state, currentIndex) {
        state.currentIndex = currentIndex
    }


}


export default mutations