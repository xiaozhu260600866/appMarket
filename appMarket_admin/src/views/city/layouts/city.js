export default {
    data: {
        'listsAction': '',
        'pageSize': 15,
        'canCreate': 1,
        'canEdit': 1,
        'tableName': 'citys',
        'createAction': '/admin/city/create',
        'editAction': '/admin/city/edit',
        'checkAll': true,
        'searchFields': [{
            'name': '',
            'prop': 'name',
            'type': 'text',
            'label': '名称'
        }],

        'tableFields': [{
            'name': '',
            'prop': 'id',
            'minWidth': '180',
            'width': '',
            'append_table_': 0,
            'label': 'ID编号'
        }, {
            'name': '',
            'prop': 'name',
            'minWidth': '180',
            'width': '',
            'append_table_': 0,
            'label': '省级城市	'
        }, {
            'name': '',
            'prop': 'getStatus',
            'minWidth': '180',
            'width': '',
            'append_table_': 0,
            'label': '状态'
        },
        {
            'name': '',
            'prop': 'status',
            'minWidth': '180',
            type: 'editField',
            url: '/admin/city/editField',
            'width': '',
            'append_table_': 0,
            'label': '开通/不开通'
        }],
        'formFields': [{
            'name': '',
            'prop': 'name',
            'datatype': 'require',
            'type': 'text',
            'append_form_': 0,
            'label': '名称'
        }, {
            'name': '',
            'prop': 'sort',
            'datatype': 'require|integer',
            'type': 'text',
            'append_form_': 0,
            'label': '排序'
        }]
    }
}
