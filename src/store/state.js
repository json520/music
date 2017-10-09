/**
 * 所有状态
 * 1.歌手
 * 2.播放状态:Boolean
 * 3.播放界面展开或缩放
 * 4.播放列表
 * 5. 倒序播放列表
 * 6. 播放模式
 * 7. 当前播放的音乐id
 **/
import { playMode } from '@/common/js/config'
import {loadSearch, loadPlayHistory, loadFavoriteList} from '@/common/js/cache'

// 只保留最基础的数据！有能被基础数据计算出来的数据不用放在里面！
const state = {
    singer: {},
    playing: false,  //播放状态
    fullScreen: false,
    playList: [],
    sequenceList: [],
    mode: playMode.sequence,  //播放模式
    currentIndex: -1,
    desc:{},
    topList:{}, //排行榜歌曲详情页
    searchHistory:loadSearch(),
    playHistory:loadPlayHistory(), // 最近播放列表
    favoriteList:loadFavoriteList() //收藏列表
}

export default state

/** 最近播放列表
 * 在vuex里面设置（state:playHistory;actions:savePlayHistory）
 * 在公共方法catch.js里面把记录保存到本地
 * state的初始值从本地localStorage里获取！
 * **/

 /**
  *在vuex里面设置
  在actions.js里面设置对外方法
  在catch.js里面把记录保存到本地
   
  **/

