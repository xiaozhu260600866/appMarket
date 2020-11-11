/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const userRouter = {
    path: '/user',
    component: Layout,
    redirect: 'noRedirect',
    name: 'User',
    meta: { title: '会员管理', icon: 'dx-vip-user' },
    children: [
      {
        path: 'lists',
        component: () => import('@/views/user/lists'),
        name: 'UserLists',
        meta: { title: '会员列表', icon: '' }
    },
    {
        path: 'comeIn',
        component: () => import('@/views/user/come_in'),
        name: 'comeIn',
        meta: { title: '佣金收入', icon: '' }
    },
    {
        path: 'comeOut',
        component: () => import('@/views/user/come_out'),
        name: 'comeOut',
        meta: { title: '佣金提现', icon: '' }
    }

    // {
      //     path: 'show',
      //     component: () => import('@/views/user/show'),
      //     name: 'UserShow',
      //     hidden: true,
      //     meta: { title: '会员详细', icon: 'dx-hr-info' }
      // },{
      //     path: 'category',
      //     component: () => import('@/views/user/category'),
      //     name: 'UserCategory',
      //     meta: { title: '会员等级管理', icon: 'dx-hr-contract' }
      // }//
    ]
}

export default userRouter
