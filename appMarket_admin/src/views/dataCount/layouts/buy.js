export default {
	data: {
		listsAction: '',
		pageSize: 15,
		canCreate: false,
		tableName: 'buy',
		auditAction: '/admin/merchant/changeStatus',
		checkAll: true,
		searchFields: [
			{prop: 'name',type: 'text',label: '会员姓名'},
			{prop: 'phone',type: 'text',label: '电话'},
			{prop: 'created_at',label: '日期',minWidth: '200',type: 'betweenDate'}
		],
		tableFields: [
			{prop: 'user_no',width: '120',minwidth:'',append_table_: 0,label: '编号'},
			{prop: 'name',width: '100',minwidth:'',append_table_: 0,label: '姓名'},
			{prop: 'phone',width: '140',minwidth:'',append_table_: 0,label: '电话',},
			{prop: 'balance',width: '150',minwidth:'',append_table_: 0,label: '余额'},
			{prop: 'turnover',width: '100',minwidth:'',append_table_: 0,label: '成交量',align: 'center'},
			{prop: 'business_volume',width: '120',minwidth:'',append_table_: 0,label: '成交金额'},
			{prop: 'register_at',width: '170',minwidth:'',append_table_: 0,label: '注册时间',align: 'center'},
			{prop: 'login_at',width: '',minwidth:'170',append_table_: 0,label: '最后一次登录时间',align: 'center'}
		]
	}
}
