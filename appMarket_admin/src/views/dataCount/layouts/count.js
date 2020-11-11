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
			{prop: 'merchant_name',type: 'text',label: '所属商家'},
			{prop: 'buy_name',type: 'text',label: '购买者'},
			{prop: 'created_at',label: '日期',minWidth: '200',type: 'betweenDate'}
		],
		tableFields: [
			{prop: 'order_no',width: '120',minwidth:'',append_table_: 0,label: '订单号'},
			{prop: 'name',width: '',minwidth:'80',append_table_: 0,label: '商品名称'},
			{prop: 'merchant_name',width: '150',minwidth:'',append_table_: 0,label: '所属商家'},
			{prop: 'num',width: '80',minwidth:'',append_table_: 0,label: '数量',align:'center'},
			{prop: 'amount',width: '110',minwidth:'',append_table_: 0,label: '金额'},
			{prop: 'buy_name',width: '100',minwidth:'',append_table_: 0,label: '购买者'},
			{prop: 'buy_address',width: '',minwidth:'60',append_table_: 0,label: '地址'},
			{prop: 'created_at',width: '160',minwidth:'',append_table_: 0,label: '完成时间'}
		]
	}
}
