export default {
	data: {
		listsAction: '',
		pageSize: 15,
		canCreate: false,
		tableName: 'count',
		auditAction: '/admin/merchant/changeStatus',
		checkAll: true,
		searchFields: [
			{prop: 'name',type: 'text',label: '商品名称'},
			{prop: 'created_at',label: '日期',minWidth: '200',type: 'betweenDate'}
		],
		tableFields: [
			{prop: 'name',width: '',minwidth:'200',append_table_: 0,label: '商品名称'},
			{prop: 'merchant_name',width: '',minwidth:'100',append_table_: 0,label: '所属商家'},
			{prop: 'num',width: '150',minwidth:'',append_table_: 0,label: '销售单量',align: 'center'},
			{prop: 'amount',width: '150',minwidth:'',append_table_: 0,label: '营业额',align: 'center'},
			{prop: 'reanking',width: '150',minwidth:'',append_table_: 0,label: '销售排名',align: 'center'},
		]
	}
}
