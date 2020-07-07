export default{
    data:{
        listsAction:'',
        pageSize:'15',
        canCreate:false,
        tableName:'users',
        createAction:'',
        editAction:'',
        tableOperateButton:true,
        //是否需要审核
        //auditAction:'/admin/user/change-status',
        checkAll:true,
        // tarbars:{
        //     prop:'status',
        //     data:[
        //         {label:'审核中',value:'0','count':1,'datakey':'status0'},
        //         {label:'已审核',value:'1','count':1,'datakey':'status1'},
        //         {label:'审核拒绝',value:'2','count':1,'datakey':'status2'},
        //     ]
        // },
        tableFields:[
            {prop:'id',label:'ID',width:"80"},
            {prop:'userInfo.getSex',label:'姓别',minwidth:"100"},
            {prop:'name',label:'姓名',minwidth:"100"},
            {prop:'phone',label:'电话',minwidth:"100"},
            {prop:'address',label:'现居住地',width:"100"},
            {prop:'birthday',label:'出生日期',width:"100"},
            {prop:'height',label:'身高',width:"120"},
            {prop:'education',label:'学历',width:"100"},
            {prop:'salary',label:'月薪',width:"100"},
            {prop:'created_at',label:'注册时间',width:"160"},
            {prop:'updated_at',label:'更新时间',width:"160"},
        ],
        searchFields:[
            {prop:'sex',label:'姓别',type:"select",data:[
              {label:"男",value:1},
              {label:'女',value:2},
              ],},
            {prop:'name',label:'姓名'},
            {prop:'phone',label:'电话'},
            {prop:'created_at',label:'日期',minWidth:"200",type:'betweenDate'},
        ],
        /* formFields:[
            {prop:'name',label:'姓名',type:'text',datatype:'require'},
            {prop:'phone',label:'电话',type:'text',datatype:'require|phone'},
            {prop:'sex',label:'性别',type:'select',datatype:'require',datakey:'sexArr'},
            {prop:'address',label:'服务地址',type:'location',datatype:'require'},
            {prop:'remark',label:'备注',type:'textarea'},

        ] */
    }
}
