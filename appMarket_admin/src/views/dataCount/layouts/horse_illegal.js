export default {
	data: {
		listsAction: '',
		pageSize: 15,
		canCreate: false,
		tableName: 'merchant_illegal',
		auditAction: '/admin/merchant/changeStatus',
		checkAll: true,
		searchFields: [
			{prop: 'name',type: 'text',label: '骑手姓名'},
			{prop: 'phone',type: 'text',label: '电话'},
			{prop: 'area',type: 'text',label: '地区'},
			{prop: 'created_at',label: '日期',minWidth: '200',type: 'betweenDate'}
		],
		tableFields: [
			{prop: 'name',width: '100',minwidth:'',append_table_: 0,label: '骑手姓名'},
			{prop: 'phone',width: '120',minwidth:'',append_table_: 0,label: '电话',},
			{prop: 'area',width: '150',minwidth:'',append_table_: 0,label: '地区'},
			{prop: 'illegal_name',width: '80',minwidth:'',append_table_: 0,label: '投拆人'},
			{prop: 'illegal_phone',width: '110',minwidth:'',append_table_: 0,label: '投拆人电话'},
			{prop: 'illegal',width: '',minwidth:'120',append_table_: 0,label: '投拆情况'},
			{prop: 'remark',width: '',minwidth:'80',append_table_: 0,label: '备注'},
			{prop: 'created_at',width: '170',minwidth:'',append_table_: 0,label: '日期'},
		]
	}
}
