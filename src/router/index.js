import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import VRank from '@/components/rank/rank'
import VRecommend from '@/components/recommend/recommend'
import VSearch from '@/components/search/search'
import VSinger from '@/components/singer/singer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/rank'  //router的重定向，重定向的目标也可以是一个命名的路由名字或者方法！

    },
    {
      path: '/recommend',
      name: '推荐',
      component: VRecommend
    },
    {
      path: '/singer',
      name: '歌手',
      component: VSinger
    },
    {
      path: '/search',
      name: '搜索',
      component: VSearch
    },
    {
      path: '/rank',
      name : '排行榜',
      component: VRank
    }
    
  ]
})
