import storage from 'good-storage'

/**
 *  設定localStorage的值和存儲的最大長度
 *  獲取本地有的localStorage值！處理后進行存儲并返回存儲的值！
 *  處理localStorage的值！通過查詢下標判斷如果搜索詞在最前面不處理！在後面刪除原來的數據并插入到最前！
 * 大于存储的最大长度则删除最后一个值！
 *  **/

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '__play__' 
const PLAY_HISTORY_LENGTH = 100

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200

// 处理存储的数据
function insertArray(arr, query, compare, max) {
  let index = arr.findIndex(compare);
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(query)
  if (max && arr.length > max) {
    arr.pop()
  }

}

export function saveSearch(query) {
  let searchBox = storage.get(SEARCH_KEY, [])
  insertArray(searchBox, query, (item) => {
    return item = query
  }, SEARCH_MAX_LENGTH)

  storage.set(SEARCH_KEY, searchBox)
  return searchBox
}

// 获取本地localStorage
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

function deleteFormItem(arr,compar){
  let index = arr.findIndex(compar)
  if(index > -1){
    arr.splice(index, 1)
  }
}

// 删除本地localStorage
export function deleteSearch(query) {

  /*

  获取本地存储
  进行本地删除
  重新存储
  */
  let searchBox = storage.get(SEARCH_KEY,[])
  deleteFormItem(searchBox, (item)=>{
    return item = query
  })
  storage.set(SEARCH_KEY, searchBox)

  return searchBox;

}

// 清空所有localStorage
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

// 最近播放列表
/*
1.获取本地数据
2.插入到本地数据最前面
3.重新存储到本地
4.返回新的存储数组给vuex
*/
export function playHistory(song) {  
  let storageBox = storage.get(PLAY_KEY,[])
  insertArray(storageBox, song, (item) =>{
    return item.id === song.id 
  },PLAY_HISTORY_LENGTH)

  storage.set(PLAY_KEY,storageBox);
  return storageBox;
}

export function loadPlayHistory() { //获取最近播放列表
  return storage.get(PLAY_KEY,[])
}

// 收藏歌曲列表
export function saveFavoriteList(song) {
  let songs = storage.get(FAVORITE_KEY,[])
  insertArray(songs,song,(item)=>{
    return song.id === item.id
  },FAVORITE_MAX_LENGTH)

  storage.set(FAVORITE_KEY,songs)
  return songs;
}
// 删除收藏列表
export function deleteFavoriteList(song) {
  let songs = storage.get(FAVORITE_KEY,[])
  deleteFormItem(songs,(item) =>{
    return song.id === item.id
  })
  storage.set(FAVORITE_KEY,songs)
  return songs
}
// 获取收藏列表
export function loadFavoriteList() {
  return storage.get(FAVORITE_KEY,[])
}