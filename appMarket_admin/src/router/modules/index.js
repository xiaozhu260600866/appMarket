/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const indexRouter = {
    path: '/index',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Index',
    meta: { title: '首页', icon: 'dx-index' },
    children: [
        {
          path: 'lists',
          component: () => import('@/views/index/index'),
          name: 'index',
          meta: { title: '首页', icon: 'dx-index' }
        }
    ]
}

export default indexRouter
