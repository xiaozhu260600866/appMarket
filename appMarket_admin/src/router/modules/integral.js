/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const integralRouter = {
	path: '/integral',
	component: Layout,
	redirect: 'noRedirect',
	name: 'integral',
	meta: { title: '积分管理', icon: 'dx-integral' },
	children: [
		{
			path: 'lists',
			component: () => import('@/views/integral/lists'),
			name: 'integralLists',
			meta: { title: '积分列表', icon: '' }
		},
		{
			path: 'order-lists',
			component: () => import('@/views/integral/order/lists'),
			name: 'integralOrderLists',
			meta: { title: '订单列表', icon: '', params: { status: 3 }}
		},
		{
			path: 'order-info',
			component: () => import('@/views/integral/order/info'),
			name: 'integralOrderInfo',
			hidden: true,
			meta: { title: '订单内容', icon: '', params: { status: 3 }}
		},
		{
			path: 'create',
			component: () => import('@/views/integral/create_edit'),
			hidden: true,
			name: 'IntegralCreate',
			meta: { title: '发布积分' }
		}, {
			path: 'edit',
			component: () => import('@/views/integral/create_edit'),
			hidden: true,
			name: 'IntegralEdit',
			meta: { title: '编辑积分' }
		}

	]
}

export default integralRouter
