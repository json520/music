
import { commonParams, options } from './config'
import axios from 'axios'

export function getLyric(mid) {
  const url = '/api/getLyric';

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
    g_tk: 1991685341,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    format: 'json'
  })

  return axios.get(url,{
    params: data
  }).then((res) =>{
    return Promise.resolve(res.data)
  }).catch((err) =>{
    console.log(err)
  })
}