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
        // auditAction:'/admin/user/change-status',
        checkAll: true,
        // tarbars:{
        //     prop:'status',
        //     data:[
        //         {label:'审核中',value:'0','count':1,'datakey':'status0'},
        //         {label:'已审核',value:'1','count':1,'datakey':'status1'},
        //         {label:'审核拒绝',value:'2','count':1,'datakey':'status2'},
        //     ]
        // },
        tableFields: [
            { prop: 'id', label: '编号', width: '80' },
            { prop: 'getUser.userInfo.name', label: '姓名', width: '130' },
            { prop: 'getHorse.name', label: '骑手名称', width: '130' },
            { prop: 'order_no', label: '订单号', width: '120' },
            { prop: 'getOrder.product_str', label: '商品', minwidth: '120' },
            { prop: 'amount', label: '佣金', width: '120' },
            { prop: 'created_at', label: '注册时间', width: '160' }
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
