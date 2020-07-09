/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const merchantRouter = {
    path: '/merchant',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Merchant',
    meta: { title: '商家管理', icon: 'dx-merchant' },
    children: [
        {
          path: 'lists',
          component: () => import('@/views/merchant/lists'),
          name: 'merchantLists',
          meta: { title: '商家列表', icon: 'dx-merchant' }
        }
        // {
        //   path: 'order-lists',
        //   component: () => import('@/views/activity/order/lists'),
        //   name: 'ActivityLists',
        //   meta: { title: '订单列表', icon: 'dx-hr-info',params:{status:3} }
        // },
    ]
}

export default merchantRouter
