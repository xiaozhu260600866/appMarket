/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const horseRouter = {
    path: '/horse',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Horse',
    meta: { title: '骑家管理', icon: 'dx-horse' },
    children: [
        {
          path: 'lists',
          component: () => import('@/views/horse/lists'),
          name: 'horseLists',
          meta: { title: '骑手列表', icon: 'dx-horse' }
        },
    ]
}

export default horseRouter
