export default {
    data: {
        listsAction: '',
        pageSize: '15',
        canCreate: false,
        tableName: 'horse_incomes',
        createAction: '',
        editAction: '',
        tableOperateButton: true,
        // 是否需要审核
         auditAction: '/admin/horse/change-status-income',
        checkAll: true,
        tarbars: {
            prop: 'status',
            data: [
                { label: '审核中', value: '0', 'count': 0, 'datakey': 'status0' },
                { label: '已审核', value: '1', 'count': 0, 'datakey': 'status1' },
                { label: '审核拒绝', value: '2', 'count': 0, 'datakey': 'status2' }
            ]
        },
        tableFields: [
            { prop: 'id', label: '编号', width: '80' },
            { prop: 'order_no', label: '订单号', width: '150' },
            { prop: 'getUser.userInfo.name', label: '姓名', minwidth: '100' },
            { prop: 'getHorse.name', label: '骑手名称', minwidth: '100' },
            { prop: 'amount', label: '提现金额', width: '120' },
            { prop: 'created_at', label: '提现时间', width: '170' }
        ],
        searchFields: [
            { prop: 'name', label: '姓名' },
            { prop: 'created_at', label: '日期', minWidth: '200', type: 'betweenDate' }
        ]
        /* formFields:[
            {prop:'name',label:'姓名',type:'text',datatype:'require'},
            {prop:'phone',label:'电话',type:'text',datatype:'require|phone'},
            {prop:'sex',label:'性别',type:'select',datatype:'require',datakey:'sexArr'},
            {prop:'address',label:'服务地址',type:'location',datatype:'require'},
            {prop:'remark',label:'备注',type:'textarea'},

        ] */
    }
}
