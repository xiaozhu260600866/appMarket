export default {
    data: {
        "listsAction": "",
        "pageSize": 15,
        "canCreate": 1,
        "canEdit": 1,
        "tableName": "users",
        "createAction": "/admin/user/create",
        "editAction": "/admin/user/edit",
        "checkAll": true,
        "searchFields": [

            {
            "name": "",
            "prop": "company_name",
            "type": "text",
            "label": "企业名称"
            },
            {
            "name": "",
            "prop": "name",
            "type": "text",
            "label": "联系人"
            },
            {
            "name": "",
            "prop": "phone",
            "type": "text",
            "label": "电话"
            },

        ],
       "tarbars": {
            "prop": "type",
            "data": [{
                "name": "",
                "value": "1",
                "count": 0,
                "label": "首页幻灯片"
            }, {
                "name": "",
                "value": "2",
                "count": 0,
                "label": "首页广告位"
            }, {
                "name": "",
                "value": "3",
                "count": 0,
                "label": "首页导航"
            }]
        },
        "tableFields": [
            {
                "name": "",
                "prop": "company_name",
                "minWidth": "180",
                "width": "",
                "append_table_": 0,
                "label": "企业名称"
            },
            {
                "name": "",
                "prop": "username",
                "minWidth": "180",
                "width": "",
                "append_table_": 0,
                "label": "帐号"
            },
            {
                "name": "",
                "prop": "name",
                "minWidth": "180",
                "width": "",
                "append_table_": 0,
                "label": "联系人"
            },
            {
                "name": "",
                "prop": "phone",
                "minWidth": "180",
                "width": "",
                "append_table_": 0,
                "label": "联系电话"
            },

            {
                "name": "",
                "prop": "city",
                "minWidth": "180",
                "width": "",
                "append_table_": 0,
                "label": "城市"
            },
             ],
        "formFields": [
            {
                "name": "",
                "prop": "company_name",
                "datatype": "require",
                "type": "text",
                "append_form_": 0,
                column:1,
                "label": "公司名称"
            },
           {
            "name": "",
            "prop": "name",
            "datatype": "require",
            "type": "text",
            "append_form_": 0,
            "label": "代理联系人"
        },
        {
            "name": "",
            "prop": "username",
            "datatype": "require",
            "type": "text",
            "append_form_": 0,
             column:1,
            "label": "帐号"
        },
        {
            "name": "",
            "prop": "password",
            "datatype": "",
            "type": "password",
            "append_form_": 0,
            "label": "密码"
        },
        {
            "name": "",
            "prop": "phone",
            "datatype": "require|phone",
            "type": "text",
            "append_form_": 0,
             column:1,
            "label": "电话"
        },
        {
            "name": "",
            "prop": "city",
            "datatype": "require",
            datakey:"city",
            "type": "select",
            "append_form_": 0,
            "label": "城市"
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
