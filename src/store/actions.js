// 异步修改！在外部被调用！修改state里面的数据只能通过actions修改！其它都是非法的！
import * as types from './mutationsTypes'
import {playMode} from '@/common/js/config'
import {shuffle } from '@/common/js/utils'

function randomIndex(list,song){
  let index =  list.findIndex((item) =>{
      return item.id === song.id
  })
  return index
}

// 点击播放
export const selectPlay = function ({ commit, state }, { list, index }) {

  if(state.mode === playMode.random){ //歌曲已经为随机了！

    let randomList = shuffle(list)
    commit(types.SET_PLAY_LIST, randomList)
     index = randomIndex(randomList,list[index])
  }else{
    
    commit(types.SET_PLAY_LIST, list)
  }

  commit(types.SET_PLAYING, true)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURRENT_INDEX, index)

}

// 随机播放
export const randomPlay = function({ commit, state},{list}) {
  commit(types.SET_PLAYING, true)
  commit(types.SET_FULL_SCREEN, true)
  let randomList = shuffle(list)
  commit(types.SET_PLAY_LIST, randomList)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_MODE,playMode.random)
}