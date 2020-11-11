export default {
	data: {
		listsAction: '',
		pageSize: 15,
		canCreate: false,
		tableName: 'count',
		auditAction: '/admin/merchant/changeStatus',
		checkAll: true,
		searchFields: [
			{prop: 'name',type: 'text',label: '会员姓名'},
			{prop: 'phone',type: 'text',label: '电话'},
			{prop: 'created_at',label: '日期',minWidth: '200',type: 'betweenDate'}
		],
		tarbars: {
			prop: 'status',
			data: [
				{value: 0,count: 100,label: '全部'},
				{value: 1,count: 40,label: '在线'},
				{value: 2,count: 60,label: '离线'}
			]
		},
		tableFields: [
			{prop: 'no',width: '200',minwidth:'',append_table_: 0,label: '编号'},
			{prop: 'name',width: '120',minwidth:'',append_table_: 0,label: '会员姓名'},
			{prop: 'phone',width: '150',minwidth:'',append_table_: 0,label: '电话'},
			{prop: 'online',width: '120',minwidth:'',append_table_: 0,label: '是否在线',align:'center'},
			{prop: 'last_time',width: '',minwidth:'170',append_table_: 0,label: '最后一次登录时间'},
		]
	}
}
