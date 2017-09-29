import jsonp from '@/common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
        //    _: 1500796506810
    })

    return jsonp(url, data, options)
}

export function getDiscList() { //通过代理
    const url = '/api/getDiscList'

    const data = Object.assign({}, commonParams, {
        rnd: Math.random(),
        // loginUin: 0,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0,
        categoryId: 10000000,
        sortId: 5,
        sin: 0,
        ein: 29,
        format: 'json'
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

// 推荐的歌曲详情页获取
// export function getSongList(disstid) {
//     const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';

//     const data = Object.assign({}, commonParams, {
//         type: 1,
//         json: 1,
//         utf8: 1,
//         onlysong: 0,
//         disstid: disstid,
//         g_tk: 1991685341,
//         jsonpCallback: 'playlistinfoCallback',
//         hostUin: 0,
//         platform: 'yqq',
//         needNewCode: 0

//     })

//     return jsonp(url, data, options)
// }

// export function getSongList(disstid) {
//     const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  
//     const data = Object.assign({}, commonParams, {
//       disstid,
//       type: 1,
//       json: 1,
//       utf8: 1,
//       onlysong: 0,
//       platform: 'yqq',
//       jsonpCallback: 'playlistinfoCallback',
//       hostUin: 0,
//       g_tk: 1991685341,
//       needNewCode: 0,
//       format:'json'
//     })
  
//     return jsonp(url, data, options)
//   }
export function getSongList(disstid) {

    const url = '/api/getSongList';

    const data = Object.assign({}, commonParams, {
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        disstid: disstid,
        g_tk: 1991685341,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0,
        jsonpCallback: 'playlistinfoCallback',
    })

    return axios.get(url,{
        params: data
    }).then((res) =>{
        console.log('成功',res)
        return Promise.resolve(res.data)
        
    })

    
}