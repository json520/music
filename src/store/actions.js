// 异步修改！在外部被调用！修改state里面的数据只能通过actions修改！其它都是非法的！
import * as types from './mutationsTypes'
import { playMode } from '@/common/js/config'
import { shuffle } from '@/common/js/utils'
import { saveSearch, deleteSearch ,clearSearch ,playHistory, saveFavoriteList, deleteFavoriteList} from '@/common/js/cache'
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

// 删除歌曲
export const deleteSong = function ({commit, state} ,song) {
  let playList = state.playList.slice();
  let sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;

  let pIndex = randomIndex(playList,song);
  playList.splice(pIndex, 1);
  let sIndex = randomIndex(sequenceList, song);
  sequenceList.splice(sIndex, 1)
  

  if(currentIndex > pIndex || currentIndex == playList.length){
    currentIndex --
  }

  
  commit(types.SET_PLAY_LIST, playList);
  commit(types.SET_SEQUENCE_LIST, sequenceList);
  commit(types.SET_CURRENT_INDEX, currentIndex);

  if(!playList.length){
    commit(types.SET_PLAY_LIST,false)
  }else{
    commit(types.SET_PLAY_LIST,true)
  }

}

export const deleteSongList = function({commit, state}) {
  commit(types.SET_CURRENT_INDEX,[]);
  commit(types.SET_PLAY_LIST,[]);
  commit(types.SET_CURRENT_INDEX, -1);
  commit(types.SET_PLAYING, false);
}

export const savePlayHistory = function({commit, state}, song) {   //添加最近播放列表
  commit(types.SET_PLAY_HISTORY,playHistory(song))
}

// 收藏歌曲列表
export const saveFavorite = function({commit}, song) {
  commit(types.SET_FAVORITE_LIST,saveFavoriteList(song))
}
// 删除收藏歌曲
export const deleteFavorite = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST,deleteFavoriteList(song))
}