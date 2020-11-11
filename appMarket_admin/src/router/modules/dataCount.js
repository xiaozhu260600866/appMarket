/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const horseRouter = {
	path: '/dataCount',
	component: Layout,
	redirect: 'noRedirect',
	name: 'dataCount',
	meta: { title: '数据统计', icon: 'chart' },
	children: [
		{
			path: 'count',
			component: () => import('@/views/dataCount/count'),
			name: 'countLists',
			meta: { title: '销售数据统计', }
		},
		{
			path: 'merchant',
			component: () => import('@/views/dataCount/merchant'),
			name: 'merchantLists',
			meta: { title: '商家销售量', }
		},
		{
			path: 'hourse',
			component: () => import('@/views/dataCount/horse'),
			name: 'hourseListts',
			meta: { title: '骑手送货量', }
		},
		{
			path: 'buy',
			component: () => import('@/views/dataCount/buy'),
			name: 'buyLists',
			meta: { title: '用户购买量分析', }
		},
		{
			path: 'merchantIllegal',
			component: () => import('@/views/dataCount/merchant_illegal'),
			name: 'merchantIllegal',
			meta: { title: '商家违规投诉', }
		},
		{
			path: 'horseIllegal',
			component: () => import('@/views/dataCount/horse_illegal'),
			name: 'horseIllegal',
			meta: { title: '骑水违规投诉', }
		},
		{
			path: 'userOnline',
			component: () => import('@/views/dataCount/user_online'),
			name: 'userOnline',
			meta: { title: '用户在线', }
		},
		{
			path: 'merchantOnline',
			component: () => import('@/views/dataCount/merchant_online'),
			name: 'merchantOnline',
			meta: { title: '商家在线', }
		},
		{
			path: 'horseOnline',
			component: () => import('@/views/dataCount/horse_online'),
			name: 'horseOnline',
			meta: { title: '骑手在线', }
		},
		{
			path: 'reanking',
			component: () => import('@/views/dataCount/reanking'),
			name: 'reanking',
			meta: { title: '商品销售排行', }
		},
		{
			path: 'platform',
			component: () => import('@/views/dataCount/platform'),
			name: 'platform',
			meta: { title: '平台收益', }
		}
	]
}

export default horseRouter
