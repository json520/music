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

// 只保留最基础的数据！有能被基础数据计算出来的数据不用放在里面！
const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playList: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    desc:{},
    topList:{} //排行榜歌曲详情页
}

export default state