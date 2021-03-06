export default {
	data: {
		listsAction: '',
		pageSize: 15,
		canCreate: false,
		tableName: 'horse',
		auditAction: '/admin/merchant/changeStatus',
		checkAll: true,
		searchFields: [
			{prop: 'name',type: 'text',label: '骑手名称'},
			{prop: 'phone',type: 'text',label: '电话'},
			{prop: 'created_at',label: '日期',minWidth: '200',type: 'betweenDate'}
		],
		tableFields: [
			{prop: 'name',width: '80',minwidth:'',append_table_: 0,label: '骑手名称'},
			{prop: 'phone',width: '120',minwidth:'',append_table_: 0,label: '电话',},
			{prop: 'area',width: '',minwidth:'110',append_table_: 0,label: '地区'},
			{prop: 'order_num',width: '80',minwidth:'',append_table_: 0,label: '单量',align: 'center'},
			{prop: 'business_volume',width: '100',minwidth:'',append_table_: 0,label: '收益'},
			{prop: 'turnover_ranking',width: '80',minwidth:'',append_table_: 0,label: '收益排名',align: 'center'}
		]
	}
}
