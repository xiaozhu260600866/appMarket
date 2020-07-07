export default {
    data: {
        "listsAction": "",
        "pageSize": 15,
        "canCreate": 0,
        "canEdit": 0,
        "tableName": "articles",
        "createAction": "/admin/article/create",
        "editAction": "/admin/article/edit",
        classAction:'/admin/article/',
        "checkAll": true,
        "searchFields": [
            {
            "name": "",
            "prop": "title",
            "type": "text",
            "label": "文章名称"
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
                "label": "文章名称"
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
                "prop": "published_at",
                "minWidth": "180",
                "width": "",
                "append_table_": 0,
                "label": "发布日期"
            },
        ],
        "formFields": [
            {
                "name": "",
                "prop": "title",
                "datatype": "require",
                "type": "text",
                "append_form_": 0,
                "label": "文章标题"
            },
           {
               "name": "",
               "prop": "class_value",
               "datatype": "require",
               datakey:"fclass",
               "type": "manyselect",
               "append_form_": 0,
               "label": "分类"
           },
           {
               "name": "",
               "prop": "cover",
               allowUpLoadNum:1,
               upurl:'article',
               "type": "upload",
               "append_form_": 0,
               "label": "图片"
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
