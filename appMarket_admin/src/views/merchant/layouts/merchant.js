export default {
	data: {
		'listsAction': '',
		'pageSize': 15,
		'canCreate': 1,
		'canEdit': 1,
		'tableName': 'merchant',
		'createAction': '/admin/merchant/create',
		'editAction': '/admin/merchant/edit',
		auditAction: '/admin/merchant/changeStatus',
		'checkAll': true,
		'searchFields': [
			{ 'prop': 'name', 'type': 'text', 'label': '商家名称' },
			{ 'prop': 'phone', 'type': 'text', 'label': '商家电话' },
			{ 'prop': 'market_id', 'type': 'select', 'label': '所属市场', datakey: 'markets' }
		],
		'tarbars': {
			'prop': 'status',
			'data': [{
				'value': '0',
				'count': 0,
				'label': '审核中'
			}, {
				'value': '1',
				'count': 0,
				'label': '已审核'
			}, {
				'value': '2',
				'count': 0,
				'label': '审核拒绝'
			}]
		},
		'tableFields': [
			{ 'prop': 'user_id', 'width': '80', 'append_table_': 0, 'label': '编号' },
			{ 'prop': 'name', 'minWidth': '100', 'append_table_': 0, 'label': '商家名称' },
			{ 'prop': 'phone', 'width': '110', 'append_table_': 0, 'label': '商家电话' },
			{ 'prop': 'marketName', 'width': '110', 'append_table_': 0, 'label': '所属市场' },
			{ 'prop': 'hour_time', 'width': '110', 'append_table_': 0, 'label': '营业时间' },
			{ 'prop': 'address', 'minWidth': '180', 'append_table_': 0, 'label': '商家地址' },
			{ 'prop': 'working', 'width': '80', 'append_table_': 0, 'label': '营业状态' },
      		{ 'prop': 'recommend', 'minWidth': '', 'width': '90', 'align': 'center', 'type': 'editField', 'url': '/admin/merchant/editField', 'append_table_': 0, 'label': '推荐首页' },
			{ 'prop': 'getStatus', 'width': '80', 'append_table_': 0, 'label': '审核状态' },
  			{ 'prop': 'sort', 'minWidth': '', 'width': '100', 'align': 'center', 'type': 'sort', 'url': '/admin/merchant/editField', 'label': '排序' },
			{ 'prop': 'created_at', 'width': '160', 'append_table_': 0, 'label': '注册时间' }
		],
		'formFields': [
			{ prop: 'city', datatype: 'require', type: 'manyselect', label: '省市区', 'append_form_city': 1, column: 2 },
			{ prop: 'market_id', datatype: 'require', type: 'select', label: '市场', datakey: 'market' },
			{ prop: 'name', datatype: 'require', type: 'text', label: '商家名称' },
			{ prop: 'phone', datatype: 'require|phone', type: 'text', label: '手机号码', column: 2 },
			{ prop: 'password', datatype: 'require', type: 'password', label: '密码' },
			{ prop: 'address', datatype: 'require', type: 'location', label: '地址' },
			{ prop: 'hour_time', datatype: 'require', type: 'text', label: '营业时间', column: 2 },
			{ prop: 'appointment', datatype: 'require', type: 'switch', label: '接受预订' },
			{ prop: 'order_amount', datatype: 'require', type: 'text', label: '起订金额', column: 2 },
			{ prop: 'auto_order', datatype: 'require', type: 'switch', label: '自动接单' },
			{ prop: 'logo', datatype: 'array', type: 'upload', label: 'Logo图', allowUpLoadNum: 1, upurl: 'merchant', column: 2 },
			{ prop: 'idCard', datatype: 'array', type: 'upload', label: '身份证正图', allowUpLoadNum: 1, upurl: 'merchant' },
			{ prop: 'idCard2', datatype: 'array', type: 'upload', label: '身份证背图', allowUpLoadNum: 1, upurl: 'merchant', column: 2 },
			{ prop: 'company_logo', datatype: 'array', type: 'upload', label: '营业执照', allowUpLoadNum: 1, upurl: 'merchant' },
			{ prop: 'health_logo', datatype: 'array', type: 'upload', label: '健康证', allowUpLoadNum: 1, upurl: 'merchant' },
			{ prop: 'shop', datatype: 'require', type: 'switch', label: '封停' },
			// { prop: 'swiper', datatype: 'array', type: 'upload', label: '轮播图', allowUpLoadNum: 1, upurl: 'merchant' }
		]
	}
}
