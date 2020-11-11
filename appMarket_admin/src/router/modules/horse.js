/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const horseRouter = {
    path: '/horse',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Horse',
    meta: { title: '骑手管理', icon: 'dx-horse' },
    children: [
        {
          path: 'lists',
          component: () => import('@/views/horse/lists'),
          name: 'horseLists',
          meta: { title: '骑手列表', icon: '' }
        },
        {
            path: 'comeIn',
            component: () => import('@/views/horse/come_in'),
            name: 'comeIn',
            meta: { title: '骑手收入', icon: '' }
        },
        {
            path: 'comeOut',
            component: () => import('@/views/horse/come_out'),
            name: 'comeOut',
            meta: { title: '骑手提现', icon: '' }
        }
    ]
}

export default horseRouter
