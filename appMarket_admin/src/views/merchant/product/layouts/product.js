export default {
    data: {
        'listsAction': '',
        'pageSize': 15,
        'canCreate': 0,
        'canEdit': 0,
        'tableName': 'products',
        'createAction': '/admin/merchant/product/create',
        'editAction': '/admin/merchant/product/edit',
        classAction: '/admin/merchant/product/',
        auditAction: '/admin/merchant/product/changeStatus',
        'checkAll': true,
        'searchFields': [
            {
            'name': '',
            'prop': 'name',
            'type': 'text',
            'label': '产品名称'
            },
            {
            'name': '',
            'prop': 'merchant_name',
            'type': 'text',
            'label': '商家名称'
            },
            {
            'prop': 'fclass',
            'type': 'manyselect',
            'datakey': 'fclass',
            'label': '分类'
            }
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
            { 'prop': 'id', 'minWidth': '', 'width': '80','align': 'center', 'append_table_': 0, 'label': '编号' },
            { 'prop': 'cover', 'minWidth': '', 'width': '60', 'append_table_cover': 1, 'label': '图片' },
            { 'prop': 'name', 'minWidth': '180', 'width': '', 'append_table_': 0, 'label': '产品名称' },
            { 'prop': 'fclassname', 'minWidth': '', 'width': '100', 'append_table_': 0, 'label': '分类' },
            { 'prop': 'merchant_name', 'minWidth': '', 'width': '120', 'append_table_': 0, 'label': '商家名称' },
            { 'prop': 'price', 'minWidth': '', 'width': '100', 'align': 'center', 'append_table_': 0, 'label': '单价' },
            { 'prop': 'specs', 'minWidth': '', 'width': '60', 'align': 'center', 'append_table_': 0, 'label': '规格' },
            { 'prop': 'num', 'minWidth': '', 'width': '60', 'align': 'center', 'append_table_': 0, 'label': '库存' },
            { 'prop': '', 'minWidth': '', 'width': '60', 'align': 'center', 'append_table_': 0, 'label': '销量' },
            { 'prop': '', 'minWidth': '', 'width': '100', 'align': 'center', 'append_table_': 0, 'label': '状态' },
            { 'prop': 'shell_date', 'minWidth': '', 'width': '100', 'append_table_': 0, 'label': '售卖日期' },
            { 'prop': 'created_at', 'minWidth': '', 'width': '160', 'append_table_': 0, 'label': '发布日期' }
        ],
        'formFields': [
            { 'prop': 'name', 'datatype': 'require', 'type': 'text', 'append_form_': 0, 'label': '产品名称', column: 2 },
            { 'prop': 'class_value', 'datatype': 'require', datakey: 'fclass', 'type': 'manyselect', 'append_form_': 0, 'label': '分类' },
            { prop: 'merchant_id', 'datatype': 'require', name: 'merchant_name', rowName: 'name', label: '选择商家', type: 'searchRadio', url: '/admin/merchant/lists?status=1&type=search', tableFields: [
               { prop: 'name', label: '商家名称', width: '200' },
               { prop: 'phone', label: '商家电话', width: '200' }
               ], searchFields: [
                    { prop: 'name', label: '商家名称' }
               ] },
           { 'prop': 'price', 'datatype': 'require', 'type': 'text', 'append_form_': 0, 'label': '单价', column: 2 },
           { 'prop': 'specs', 'datatype': 'require', 'type': 'text', 'append_form_': 0, 'label': '规格' },
           { 'prop': 'num', 'datatype': 'require', 'type': 'text', 'append_form_': 0, 'label': '库存', column: 2 },
           { 'prop': 'freshness', 'datatype': 'require', 'type': 'text', 'append_form_': 0, 'label': '新鲜度' },
           { 'prop': 'shell_date', 'datatype': 'require', 'type': 'date', 'append_form_': 0, 'label': '售卖日期' },
           { 'prop': 'auto_putaway', 'datatype': 'require', 'append_form_auto_putaway': 1, 'label': '自动上架' },
           { 'prop': 'auto_group', 'datatype': 'require', 'append_form_auto_group': 1, 'label': '拼团设置' },
           { 'prop': 'is_index', 'datatype': 'require', type: 'switch', 'append_form_auto_putaway': 0, 'label': '店家推荐' },
           { 'prop': 'cover', allowUpLoadNum: 5, upurl: 'product', 'type': 'upload', 'append_form_': 0, 'label': '图片' },
           { 'prop': 'content', 'datatype': 'require', 'type': 'editor', 'append_form_': 0, 'label': '' }
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
