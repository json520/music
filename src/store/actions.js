// 异步修改！在外部被调用！修改state里面的数据只能通过actions修改！其它都是非法的！
import * as types from './mutationsTypes'
import { playMode } from '@/common/js/config'
import { shuffle } from '@/common/js/utils'
import { saveSearch, deleteSearch ,clearSearch} from '@/common/js/cache'
function randomIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
  
}

// 点击播放
export const selectPlay = function ({ commit, state }, { list, index }) {

  if (state.mode === playMode.random) { //歌曲已经为随机了！

    let randomList = shuffle(list)
    commit(types.SET_PLAY_LIST, randomList)
    index = randomIndex(randomList, list[index])
  } else {

    commit(types.SET_PLAY_LIST, list)
  }

  commit(types.SET_PLAYING, true)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURRENT_INDEX, index)

}

// 随机播放
export const randomPlay = function ({ commit, state }, { list }) {
  commit(types.SET_PLAYING, true)
  commit(types.SET_FULL_SCREEN, true)
  let randomList = shuffle(list)
  commit(types.SET_PLAY_LIST, randomList)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_MODE, playMode.random)
}

// 插入歌曲
export const insertSong = function ({ commit, state }, song) {
  
  let playList = state.playList.slice();
  let sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;

  // 当前的歌曲
  let currentSong = playList[currentIndex];
  // 当前列表有要带插入的歌曲并返回下标
  let fpIndex = randomIndex(playList, song);
  
  currentIndex++
  // 当前要插入的位置
  playList.splice(currentIndex, 0, song);

  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1)
      currentIndex--;
    } else {
      playList.splice(fpIndex + 1, 1)
    }
  }

  /**     修改squenceList    **/
  let squenceIndex = randomIndex(sequenceList, currentSong) + 1
  let squenceFpIndex = randomIndex(sequenceList, song);
  // squenceIndex++;
  sequenceList.splice(squenceIndex, 0, song);

  if(squenceFpIndex >-1){
    if(squenceIndex > squenceFpIndex) {
      sequenceList.splice(squenceFpIndex, 1)
      // squenceIndex--;
    }else{
      sequenceList.splice(squenceFpIndex + 1, 1)
    }
  }

  commit(types.SET_PLAY_LIST,playList);
  commit(types.SET_SEQUENCE_LIST, sequenceList);
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING, true)

}
// 保存本地存儲
export const saveSearchHistory= function({commit,state},query){
  commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}

export const deleteSearchHistory = function ({commit, state}, query){
  commit(types.SET_SEARCH_HISTORY,deleteSearch(query))
}

export const clearSearchHistory = function ({commit, state}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}