import jsonp from '@/common/js/jsonp'
import { commonParams, options } from './config'

export  function getRecommend(){
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    const data = Object.assign({},commonParams,{
       platform: 'h5',
       uin: 0,
       needNewCode: 1
    //    _: 1500796506810
    })

    return jsonp(url , data ,options)
}