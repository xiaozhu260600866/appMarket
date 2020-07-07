/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const financeRouter = {
    path: '/finance',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Finance',
    meta: {title: '财务管理', icon: 'dx-finance'},
    children: [{
        path: 'receivable',
        component: () => import('@/views/finance/bill/receivable'),
        name: 'FinanceReceivable',
        meta: { title: '应收账款', icon: 'dx-finance-receivable' },
        children: [{
            path: 'lists',
            component: () => import('@/views/finance/bill/lists'),
            name: 'FinanceReceivableLists',
            meta: { title: '应收账款'}
        }]
    },{
        path: 'payable',
        component: () => import('@/views/finance/bill/payable'),
        name: 'FinancePayable',
        meta: { title: '应付账款', icon: 'dx-finance-payable' },
        children: [{
            path: 'lists',
            component: () => import('@/views/finance/bill/lists'),
            name: 'FinancePayableLists',
            meta: { title: '应付账款'}
        }]
    },{
        path: 'capital',
        component: () => import('@/views/finance/capital/index'),
        name: 'FinanceCapital',
        meta: { title: '资金流水', icon: 'dx-finance-capital' },
        children: [{
            path: 'lists',
            component: () => import('@/views/finance/capital/records'),
            name: 'FinanceCapitalRecord',
            meta: { title: '资金流水'}
        }]
    },{
        path: 'config',
        component: () => import('@/views/finance/config/index'),
        name: 'FinanceConfig',
        meta: { title: '基础资料', icon: 'tab' }
    }]
}

export default financeRouter
