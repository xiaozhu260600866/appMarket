export default{
    data:{
        listsAction:'',
        pageSize:'15',
        canCreate:false,
        canEdit:false,
        tableName:'distributions',
        createAction:'',
        editAction:'',
        //是否需要审核
        auditAction:'',
        checkAll:true,
        // tarbars:{
        //     prop:'status',
        //     data:[
        //         {label:'全部',value:'12'},
        //         {label:'未审核',value:'0'},
        //         {label:'已审核',value:'1'},
        //     ]
        // },
        tableFields:[
            {prop:'id',label:'会员id',width:"120"},
            {prop:'getUser.nickname',label:'呢称',width:"120"},
            {prop:'getDev.name',label:'等级',width:"120"},
            {label:'姓名/手机号码',width:"130",append_table_name:true,prop:'name'},
            {prop:'getReferrer',label:'推荐人',minWidth:"100",append_table_getReferrer:true,},
            {prop:'amount',label:'累计佣金',width:"100"},
            {label:'下级分销商',width:"100",append_table_downCount:true,prop:'downCount'},
            {prop:'clientCount',label:'客户数',width:"70"},
            {prop:'orderCount',label:'订单数',width:"70"},
            {label:'状态',width:"100",append_table_status:true,prop:'status'},
            {prop:'created_at',label:'日期',width:"160"},
        ],
        searchFields:[
            {prop:'searchFields',label:'昵称/姓名/电话'},
            {prop:'distribution_name',label:'推荐人'},
            {prop:'created_at',label:'成为分销商时间',type:'betweenDate', placeholder:"请选择开始时间"},
        ],
    }
}
