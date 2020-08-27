/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const settingRouter = {
    path: '/setting',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Setting',
    meta: { title: '基本配置', icon: 'dx-setting' },
    children: [{
        path: 'system',
        component: () => import('@/views/setting/system'),
        name: 'SettingSystem',
        meta: { title: '系统配置', icon: 'dx-sales-order' }
    }, {
        path: 'poster',
        component: () => import('@/views/poster/lists'),
        name: 'SettingPoster',
        meta: { title: '媒体设置', icon: 'dx-sales-order', params: { type: 1 }}
    },
    {
        path: 'userRechargeRole',
        component: () => import('@/views/setting/rechargeRole/lists'),
        name: 'SettingPoster',
        meta: { title: '充值规则', icon: 'dx-sales-order', params: { type: 1 }}
    },
    {
        path: 'city',
        component: () => import('@/views/city/lists'),
        name: 'SettingPoster',
        meta: { title: '地区设置', icon: 'dx-sales-order' }
    },
    {
        path: 'market',
        component: () => import('@/views/market/lists'),
        name: 'SettingPoster',
        meta: { title: '市场设置', icon: 'dx-sales-order' }
    }]
}

export default settingRouter
