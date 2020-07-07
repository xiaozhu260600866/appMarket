/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const merchantRouter = {
    path: '/merchant',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Merchant',
    meta: { title: '商家管理', icon: 'dx-hr' },
    children: [
        {
          path: 'order-lists',
          component: () => import('@/views/merchant/order/lists'),
          name: 'merchantOrderLists',
          meta: { title: '订单列表', icon: 'dx-hr-info', params: { status: 3 }}
        },
        {
          path: 'lists',
          component: () => import('@/views/merchant/lists'),
          name: 'merchantLists',
          meta: { title: '商家列表', icon: 'dx-hr-info' }
        },
        {
          path: 'product-lists',
          component: () => import('@/views/merchant/product/lists'),
          name: 'productLists',
          meta: { title: '商品列表', icon: 'dx-hr-info', params: {}}
        },
        {
            path: 'product-create',
            component: () => import('@/views/merchant/product/create'),
            hidden: true,
            name: 'ProductCreate',
            meta: { title: '发布商品' }
        }, {
            path: 'product-edit',
            component: () => import('@/views/merchant/product/create'),
            hidden: true,
            name: 'ProductEdit',
            meta: { title: '编辑商品' }
        }
    ]
}

export default merchantRouter
