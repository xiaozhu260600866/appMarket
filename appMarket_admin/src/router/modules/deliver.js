/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const deliverRouter = {
    path: '/deliver',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Horse',
    meta: { title: '自提点管理', icon: 'dx-horse' },
    children: [
        {
          path: 'lists',
          component: () => import('@/views/deliver/lists'),
          name: 'deliverLists',
          meta: { title: '自提点列表', icon: 'dx-deliver' }
        },
        {
            path: 'comeIn',
            component: () => import('@/views/deliver/come_in'),
            name: 'comeIn',
            meta: { title: '自提点收入', icon: 'dx-vip-user' }
        },
        {
            path: 'comeOut',
            component: () => import('@/views/deliver/come_out'),
            name: 'comeOut',
            meta: { title: '自提点提现', icon: 'dx-vip-user' }
        }
    ]
}

export default deliverRouter
