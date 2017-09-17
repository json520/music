// 入口
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'

import createLogger from 'vuex/dist/logger'  //通过mutations修改state！会有前后修改的数据

Vue.use(Vuex)

// vuex调试工具,npm run dev 是dev环境，npm run build 是production环境,在开发化境使用
const debug = process.env.NODE_ENV !== 'production'


export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})