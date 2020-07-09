/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const feedbackRouter = {
    path: '/feedback',
    component: Layout,
    redirect: 'noRedirect',
    name: 'feedback',
    meta: {title: '留言管理', icon: 'wechat'},
    children: [{
        path: 'lists',
        component: () => import('@/views/feedback/lists'),
        name: 'feedbackLists',
        meta: { title: '留言列表', icon: 'wechat',params:{type:1} }
    }]
}

export default feedbackRouter
