/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const deliverRouter = {
    path: '/deliver',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Horse',
    meta: { title: '自提点管理', icon: 'dx-deliver' },
    children: [
        {
          path: 'lists',
          component: () => import('@/views/deliver/lists'),
          name: 'deliverLists',
          meta: { title: '自提点列表', icon: '' }
        },
        {
            path: 'comeIn',
            component: () => import('@/views/deliver/come_in'),
            name: 'comeIn',
            meta: { title: '自提点收入', icon: '' }
        },
        {
            path: 'comeOut',
            component: () => import('@/views/deliver/come_out'),
            name: 'comeOut',
            meta: { title: '自提点提现', icon: '' }
        }
    ]
}

export default deliverRouter
