import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import VRank from '@/components/rank/rank'
import VRecommend from '@/components/recommend/recommend'
import VSearch from '@/components/search/search'
import VSinger from '@/components/singer/singer'
import VSingerDetail from '@/components/singerDetail/singerDetail'
import VDescr from '@/components/desc/desc'
import VTopList from '@/components/topList/topList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'  //router的重定向，重定向的目标也可以是一个命名的路由名字或者方法！

    },
    {
      path: '/recommend',
      name: '推荐',
      component: VRecommend,
      children:[
        {
          path: ':id',
          component: VDescr
        }
      ]
    },
    {
      path: '/singer',
      name: '歌手',
      component: VSinger,
      children:[
        {
          path: ':id',
          component: VSingerDetail
        }
      ]
    },
    {
      path: '/search',
      name: '搜索',
      component: VSearch,
      children:[
        {
          path: ':id',
          component: VSingerDetail
        }
      ]
    },
    {
      path: '/rank',
      name : '排行榜',
      component: VRank,
      children:[
        {
          path: ':id',
          component: VTopList
        }
      ]
    }
    
  ]
})
