export default {
    data: {
        "listsAction": "",
        "pageSize": 15,
        "canCreate": 1,
        "canEdit": 1,
        "tableName": "activitys",
        "createAction": "/admin/activity/create",
        "editAction": "/admin/activity/edit",
        classAction:'/admin/activity/',
        "checkAll": true,
        "searchFields": [
            {
            "name": "",
            "prop": "title",
            "type": "text",
            "label": "活动名称"
            },
            {
            "prop": "fclass",
            "type": "manyselect",
            "datakey":'fclass',
            "label": "分类"
            },
        ],
       // "tarbars": {
       //      "prop": "type",
       //      "data": [{
       //          "name": "",
       //          "value": "1",
       //          "count": 0,
       //          "label": "首页幻灯片"
       //      }, {
       //          "name": "",
       //          "value": "2",
       //          "count": 0,
       //          "label": "首页广告位"
       //      }, {
       //          "name": "",
       //          "value": "3",
       //          "count": 0,
       //          "label": "首页导航"
       //      }]
       //  },
        "tableFields": [
            {
                "name": "",
                "prop": "title",
                "minWidth": "180",
                "width": "",
                "append_table_": 0,
                "label": "活动名称"
            },
            {
                "name": "",
                "prop": "fclassname",
                "minWidth": "180",
                "width": "",
                "append_table_": 0,
                "label": "分类"
            },
            {
                "name": "",
                "prop": "people",
                "minWidth": "180",
                "width": "",
                "append_table_": 0,
                "label": "人数"
            },
            {
                "name": "",
                "prop": "amount",
                "minWidth": "180",
                "width": "",
                "append_table_": 0,
                "label": "金额"
            },
            {
                "name": "",
                "prop": "start_date",
                "minWidth": "180",
                "width": "",
                "append_table_": 0,
                "label": "开始日期"
            },
            {
                "name": "",
                "prop": "end_date",
                "minWidth": "180",
                "width": "",
                "append_table_": 0,
                "label": "结束日期"
            },
        ],
        "formFields": [
            {
                "name": "",
                "prop": "title",
                "datatype": "require",
                "type": "text",
                "append_form_": 0,
                "label": "活动内容"
            },
            {
                "name": "",
                "prop": "amount",
                "datatype": "require",
                "type": "text",
                column:2,
                "append_form_": 0,
                "label": "金额"
            },
            {
                "name": "",
                "prop": "people",
                "datatype": "require",
                "type": "text",
                "append_form_": 0,
                "label": "人数"
            },
            {
                "name": "",
                "prop": "intro",
                "datatype": "require",
                "type": "textarea",
                "append_form_": 0,
                "label": "备注"
            },
           {
               "name": "",
               "prop": "class_value",
               "datatype": "require",
               column:2,
               datakey:"fclass",
               "type": "manyselect",
               "append_form_": 0,
               "label": "分类"
           },
           {
               "name": "",
               "prop": "published_at",
               "datatype": "require",
               "type": "date",
               "append_form_": 0,
               "label": "发布日期"
           },
           {
               "name": "",
               "prop": "start_date",
               "datatype": "require",
               column:2,
               datakey:"fclass",
               "type": "date",
               "append_form_": 0,
               "label": "开始日期"
           },
           {
               "name": "",
               "prop": "end_date",
               "datatype": "require",
               "type": "date",
               "append_form_": 0,
               "label": "结束日期"
           },
           {
               "name": "",
               "prop": "cover",
               allowUpLoadNum:5,
               upurl:'activity',
               "type": "upload",
               "append_form_": 0,
               "label": "轮播图"
           },
           {
               "name": "",
               "prop": "thump_pic",
               allowUpLoadNum:5,
               upurl:'activity',
               "type": "upload",
               "append_form_": 0,
               "label": "缩略图"
         },

        {
            "name": "",
            "prop": "content",
            "datatype": "require",
            "type": "editor",
            "append_form_": 0,
            "label": ""
        },
        // {
        //     "prop": "pic",
        //     "datatype": "array",
        //     "type": "upload",
        //     "append_form_": 0,
        //     "label": "pic",
        //     "allowUpLoadNum": "1",
        //     "upurl": "coupon"
        // },
        ]
    }
}
