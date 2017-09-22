// 异步修改！在外部被调用！修改state里面的数据只能通过actions修改！其它都是非法的！
import * as types from './mutationsTypes'



export const selectPlay = function ({ commit, state }, { list, index }) {

  commit(types.SET_PLAYING, true)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAY_LIST, list)
  commit(types.SET_CURRENT_INDEX, index)


}