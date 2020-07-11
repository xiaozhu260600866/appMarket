export default {
    data: {
        'listsAction': '',
        'pageSize': 15,
        'canCreate': 1,
        'canEdit': 1,
        'tableName': 'horses',
        'createAction': '/admin/horse/create',
        'editAction': '/admin/horse/edit',
        auditAction: '/admin/horse/changeStatus',
        'checkAll': true,
        'searchFields': [
          { 'prop': 'name', 'type': 'text', 'label': '骑手名称' },
          { 'prop': 'phone', 'type': 'text', 'label': '骑手电话' }
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
          { 'prop': 'name', 'minWidth': '180', 'append_table_': 0, 'label': '骑手姓名' },
          { 'prop': 'phone', 'minWidth': '180', 'append_table_': 0, 'label': '骑手电话' },
          { 'prop': 'getTransportation', 'minWidth': '180', 'append_table_': 0, 'label': '交通工具' },
          { 'prop': 'amount', 'minWidth': '180', 'append_table_': 0, 'label': '余额' }

       ],
        'formFields': [
          { prop: 'city', datatype: 'require', datakey: 'citys', type: 'manyselect', 'label': '区域分配' },
          { prop: 'name', datatype: 'require', type: 'text', label: '骑手名称' },
          { prop: 'phone', datatype: 'require|phone', type: 'text', label: '骑手号码' },
          { prop: 'password', datatype: 'require', type: 'password', label: '密码' },
          { prop: 'transportation', datatype: 'require', type: 'select', label: '交通工具', data: [
              { label: '是', value: 1 },
              { label: '否', value: 0 }
          ] },
          { prop: 'idCard', datatype: 'array', type: 'upload', label: '身份证正图', allowUpLoadNum: 1, upurl: 'horse' },
          { prop: 'idCard2', datatype: 'array', type: 'upload', label: '身份证背图', allowUpLoadNum: 1, upurl: 'horse' }
        ]
    }
}
