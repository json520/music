import storage from 'good-storage'

/**
 *  設定localStorage的值和存儲的最大長度
 *  獲取本地有的localStorage值！處理后進行存儲并返回存儲的值！
 *  處理localStorage的值！通過查詢下標判斷如果搜索詞在最前面不處理！在後面刪除原來的數據并插入到最前！
 * 大于存储的最大长度则删除最后一个值！
 *  **/

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

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