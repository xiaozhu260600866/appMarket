export default {
  data: {
    'listsAction': '',
    'pageSize': 15,
    'canCreate': 0,
    'canEdit': 0,
    'tableName': 'integral_products',
    'createAction': '/admin/integral/create',
    'editAction': '/admin/integral/edit',
    classAction: '/admin/integral/',
    'checkAll': true,
    'searchFields': [{
        'name': '',
        'prop': 'name',
        'type': 'text',
        'label': '积分奖品'
      },
      {
        'prop': 'fclass',
        'type': 'manyselect',
        'datakey': 'fclass',
        'label': '分类'
      }
    ],

    'tableFields': [{
        'name': '',
        'prop': 'name',
        'minWidth': '180',
        'width': '',
        'append_table_': 0,
        'label': '积分奖品'
      },
      {
        'name': '',
        'prop': 'fclassname',
        'minWidth': '',
        'width': '180',
        'append_table_': 0,
        'label': '分类'
      },
      {
        'name': '',
        'prop': 'integral',
        'minWidth': '180',
        'width': '',
        'append_table_': 0,
        'label': '积分'
      },
      {
        'name': '',
        'prop': 'published_at',
        'minWidth': '',
        'width': '120',
        'append_table_': 0,
        'label': '发布日期'
      }
    ],
    'formFields': [{
        'name': '',
        'prop': 'name',
        'datatype': 'require',
        'type': 'text',
        'append_form_': 0,
        'label': '积分奖品'
      },
      {
        'name': '',
        'prop': 'integral',
        'datatype': 'require|number',
        'type': 'text',
        'append_form_': 0,
        'label': '积分'
      },
      {
        'name': '',
        'prop': 'num',
        'datatype': 'require|number',
        'type': 'text',
        'append_form_': 0,
        'label': '库存'
      },
      {
        'name': '',
        'prop': 'price',
        'datatype': 'require|price',
        'type': 'text',
        'append_form_': 0,
        'label': '售价'
      },

      {
        'name': '',
        'prop': 'class_value',
        'datatype': 'require',
        datakey: 'fclass',
        'type': 'manyselect',
        'append_form_': 0,
        'label': '分类'
      },
      {
        'name': '',
        'prop': 'cover',
        allowUpLoadNum: 1,
        upurl: 'product',
        'type': 'upload',
        'append_form_': 0,
        'label': '图片'
      },
      {
        'name': '',
        'prop': 'published_at',
        'datatype': 'require',
        'type': 'date',
        'append_form_': 0,
        'label': '发布日期'
      },
      {
        'name': '',
        'prop': 'content',
        'datatype': 'require',
        'type': 'editor',
        'append_form_': 0,
        'label': ''
      }
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
