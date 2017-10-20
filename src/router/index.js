import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

// import VRank from '@/components/rank/rank'
// import VRecommend from '@/components/recommend/recommend'
// import VSearch from '@/components/search/search'
// import VSinger from '@/components/singer/singer'
// import VSingerDetail from '@/components/singerDetail/singerDetail'
// import VDescr from '@/components/desc/desc'
// import VTopList from '@/components/topList/topList'
// import VUserCenter from '@/components/userCenter/userCenter'

Vue.use(Router)

// 通过路由懒加载!减少首屏加载的资源！组件变成异步加载的函数

const VRank = (resolve) => {
  import('@/components/rank/rank').then((module) => {
    resolve(module)
  })
}

const VRecommend = (resolve) => {
  import('@/components/recommend/recommend').then((module) => {
    resolve(module)
  })
}

const VSearch = (resolve) => {
  import('@/components/search/search').then((module) => {
    resolve(module)
  })
}

const VSinger = (resolve) => {
  import('@/components/singer/singer').then((module) => {
    resolve(module)
  })
}

const VSingerDetail = (resolve) => {
  import('@/components/singerDetail/singerDetail').then((module) => {
    resolve(module)
  })
}

const VDescr = (resolve) => {
  import('@/components/desc/desc').then((module) => {
    resolve(module)
  })
}

const VTopList = (resolve) => {
  import('@/components/topList/topList').then((module) => {
    resolve(module)
  })
}

const VUserCenter = (resolve) => {
  import('@/components/userCenter/userCenter').then((module) => {
    resolve(module)
  })
}







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
      children: [
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
      children: [
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
      children: [
        {
          path: ':id',
          component: VSingerDetail
        }
      ]
    },
    {
      path: '/rank',
      name: '排行榜',
      component: VRank,
      children: [
        {
          path: ':id',
          component: VTopList
        }
      ]
    },
    {
      path: '/user',
      name: '用户中心',
      component: VUserCenter
    }

  ]
})
