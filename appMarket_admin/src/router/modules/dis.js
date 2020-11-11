/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const disRouter = {
    path: '/dis',
    component: Layout,
    redirect: 'noRedirect',
    name: 'dis',
    meta: {title: '分销管理', icon: 'dx-dis'},
    children: [
        {
          path: 'config',
          component: () => import('@/views/dis/config'),
          name: 'disConfig',
          meta: { title: '分销设置', icon: '' }
        },
        {
          path: 'lists',
          component: () => import('@/views/dis/lists'),
          name: 'disLists',
          meta: { title: '分销列表', icon: '' }
        },

    ]
}

export default disRouter
