import jsonp from '@/common/js/jsonp'
import { commonParams, options } from './config'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getSearch(query, page, zhidaqu ,perpage ) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';

  const data = Object.assign({}, commonParams, {
  
    w: query,
    p: page,
    zhidaqu: zhidaqu ? 0 : 1 ,
    perpage,
    n: perpage,
    catZhida : 1,
    platform: 'h5',
    needNewCode: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all'
  })

  return jsonp(url, data, options)

}