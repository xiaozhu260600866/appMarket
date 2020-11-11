export default {
	data: {
		listsAction: '',
		pageSize: 15,
		canCreate: false,
		tableName: 'merchant',
		auditAction: '/admin/merchant/changeStatus',
		checkAll: true,
		searchFields: [
			{prop: 'name',type: 'text',label: '商家名称'},
			{prop: 'phone',type: 'text',label: '电话'},
			{prop: 'market_id',type: 'select',label: '所属市场',datakey: 'markets'},
			{prop: 'created_at',label: '日期',minWidth: '200',type: 'betweenDate'}
		],
		tableFields: [
			{prop: 'merchant_name',width: '',minwidth:'100',append_table_: 0,label: '商家名称'},
			{prop: 'name',width: '80',minwidth:'',append_table_: 0,label: '联系人'},
			{prop: 'phone',width: '120',minwidth:'',append_table_: 0,label: '电话',},
			{prop: 'area',width: '110',minwidth:'',append_table_: 0,label: '地区'},
			{prop: 'order_num',width: '80',minwidth:'',append_table_: 0,label: '单量',align: 'center'},
			{prop: 'business_volume',width: '100',minwidth:'',append_table_: 0,label: '营业额'},
			{prop: 'turnover_ranking',width: '80',minwidth:'',append_table_: 0,label: '营业额排名',align: 'center'}
		]
	}
}
