// 存储mutation
// 把mutationsTypes里面所有的常量以types代替使用
import * as types from './mutationsTypes'

const mutations = {
    [types.SET_SINGER](state, singer){
        state.singer = singer
    }
}

export default mutations