export default {
    data: {
        'listsAction': '',
        'pageSize': 15,
        'canCreate': 1,
        'canEdit': 1,
        'tableName': 'user_recharge_roles',
        'createAction': '/admin/user/rechargeRole/create',
        'editAction': '/admin/user/rechargeRole/edit',
        'checkAll': true,
        'searchFields': [{
            'name': '',
            'prop': 'name',
            'type': 'text',
            'label': '名称'
        }],
        'tableFields': [
          { 'prop': 'name', 'minWidth': '100', 'width': '', 'append_table_': 0, 'label': '名称' },
          { 'prop': 'amount', 'minWidth': '', 'width': '120', 'append_table_': 0, 'label': '金额' },
          { 'prop': 'give_amount', 'minWidth': '180', 'width': '', 'append_table_': 0, 'label': '赠送金额' },
          { 'prop': 'status', 'minWidth': '', 'width': '90', 'align': 'center', 'type': 'editField', 'url': '/admin/market/editField', 'append_table_': 0, 'label': '启用/禁用' },
          { 'prop': 'created_at', 'minWidth': '', 'width': '160', 'append_table_': 0, 'label': '创建时间' }
       ],
        'formFields': [
          { prop: 'name', datatype: 'require', type: 'text', label: '名称' },
          { prop: 'amount', datatype: 'require|price', type: 'text', 'label': '金额' },
          { prop: 'give_amount', datatype: 'require|price', type: 'text', 'label': '赠送金额', defaultValue: 0 }

        ]
    }
}
