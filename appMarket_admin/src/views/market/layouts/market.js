export default {
    data: {
        'listsAction': '',
        'pageSize': 15,
        'canCreate': 1,
        'canEdit': 1,
        'tableName': 'markets',
        'createAction': '/admin/market/create',
        'editAction': '/admin/market/edit',
        'checkAll': true,
        'searchFields': [{
            'name': '',
            'prop': 'name',
            'type': 'text',
            'label': '名称'
        }],
        'tableFields': [
          { 'prop': 'name', 'minWidth': '180', 'append_table_': 0, 'label': '市场名称' },
          { 'prop': 'hour_time', 'minWidth': '180', 'append_table_': 0, 'label': '营业时间' },
          { 'prop': 'address', 'minWidth': '180', 'append_table_': 0, 'label': '市场地址' },
          { 'prop': 'putaway', 'minWidth': '180', type: 'editField', url: '/admin/market/editField', 'append_table_': 0, 'label': '启用/禁用' },
          { 'prop': 'created_at', 'minWidth': '180', 'append_table_': 0, 'label': '创建时间' }
       ],
        'formFields': [
          { prop: 'name', datatype: 'require', type: 'text', label: '市场名称' },
          { prop: 'city', datatype: 'require', datakey: 'citys', type: 'manyselect', 'label': '地区' },
          { prop: 'address', datatype: 'require', type: 'location', label: '地址' },
          { prop: 'hour_time', datatype: 'require', type: 'text', label: '营业时间' },
          { prop: 'cover', datatype: 'array', type: 'upload', label: 'Logo图', allowUpLoadNum: 1, upurl: 'market' },
          { prop: 'pic', datatype: 'array', type: 'upload', label: '背景图', allowUpLoadNum: 5, upurl: 'market' }
        ]
    }
}
