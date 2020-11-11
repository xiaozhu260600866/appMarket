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
          path: 'order-lists',
          component: () => import('@/views/merchant/order/lists'),
          name: 'merchantOrderLists',
          meta: { title: '订单列表', icon: '', params: { status: 3 }}
        },
        {
          path: 'lists',
          component: () => import('@/views/merchant/lists'),
          name: 'merchantLists',
          meta: { title: '商家列表', icon: '' }
        },
        {
          path: 'product-lists',
          component: () => import('@/views/merchant/product/lists'),
          name: 'productLists',
          meta: { title: '商品列表', icon: '', params: {}}
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
        },
        {
            path: 'comeIn',
            component: () => import('@/views/merchant/come_in'),
            name: 'comeIn',
            meta: { title: '商家收入', icon: '' }
        },
        {
            path: 'comeOut',
            component: () => import('@/views/merchant/come_out'),
            name: 'comeOut',
            meta: { title: '商家提现', icon: '' }
        }
    ]
}

export default merchantRouter
