export default {
    data: {
        'listsAction': '',
        'pageSize': 15,
        'canCreate': 1,
        'canEdit': 1,
        'tableName': 'delivers',
        'createAction': '/admin/deliver/create',
        'editAction': '/admin/deliver/edit',
        auditAction: '/admin/deliver/changeStatus',
        'checkAll': true,
        'searchFields': [
          { 'prop': 'name', 'type': 'text', 'label': '自提点名称' },
          { 'prop': 'phone', 'type': 'text', 'label': '自提点电话' }
          ],
          'tarbars': {
              'prop': 'status',
              'data': [{
                  'value': '0',
                  'count': 0,
                  'label': '审核中'
              }, {
                  'value': '1',
                  'count': 0,
                  'label': '已审核'
              }, {
                  'value': '2',
                  'count': 0,
                  'label': '审核拒绝'
              }]
          },
        'tableFields': [
          { 'prop': 'name', 'minWidth': '180', 'append_table_': 0, 'label': '自提点姓名' },
          { 'prop': 'phone', 'minWidth': '180', 'append_table_': 0, 'label': '自提点电话' },
          { 'prop': 'address', 'minWidth': '180', 'append_table_': 0, 'label': '自提地址' },
          { 'prop': 'cityString', 'minWidth': '180', 'append_table_': 0, 'label': '城市' },

          { 'prop': 'amount', 'minWidth': '180', 'append_table_': 0, 'label': '余额' }

       ],
        'formFields': [
         { prop: 'city', datatype: 'require', type: 'manyselect', label: '省市区', 'append_form_city': 1, column: 2 },
         { prop: 'market_id', datatype: 'require', type: 'select', label: '市场', datakey: 'market' },
          { prop: 'name', datatype: 'require', type: 'text', label: '自提点名称' },
          { prop: 'address', datatype: 'require', type: 'location', label: '自提点地址' },
          { prop: 'phone', datatype: 'require|phone', type: 'text', label: '自提点号码' },
          { prop: 'password', datatype: 'require', type: 'password', label: '密码' },

          { prop: 'idCard', datatype: 'array', type: 'upload', label: '身份证正图', allowUpLoadNum: 1, upurl: 'deliver' },
          { prop: 'idCard2', datatype: 'array', type: 'upload', label: '身份证背图', allowUpLoadNum: 1, upurl: 'deliver' },
          { prop: 'company_logo', datatype: 'array', type: 'upload', label: '营业执照', allowUpLoadNum: 1, upurl: 'deliver' },
          { prop: 'health_logo', datatype: 'array', type: 'upload', label: '健康证', allowUpLoadNum: 1, upurl: 'deliver' }
        ]
    }
}
