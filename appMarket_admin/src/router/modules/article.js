/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const articleRouter = {
    path: '/article',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Article',
    meta: {title: '文章管理', icon: 'dx-hr'},
    children: [{
        path: 'lists',
        component: () => import('@/views/article/lists'),
        name: 'ArticleLists',
        meta: { title: '文章列表', icon: 'dx-hr-info' }
    },{
        path: 'create',
        component: () => import('@/views/article/create'),
        hidden: true,
        name: 'ArticleCreate',
        meta: { title: '发布文章' }
    },{
        path: 'edit',
        component: () => import('@/views/article/create'),
        hidden: true,
        name: 'ArticleEdit',
        meta: { title: '编辑文章' }
    }]
}

export default articleRouter
