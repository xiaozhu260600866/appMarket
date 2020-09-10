export default {
    data: {
        'listsAction': '',
        'pageSize': 15,
        'canCreate': 0,
        'canEdit': 0,
        'tableName': 'orders',
        'createAction': '/admin/merchant/product/create',
        'editAction': '/admin/merchant/product/edit',
        'checkAll': true,
        'searchFields': [

            {
            'name': '',
            'prop': 'order_no',
            'type': 'text',
            'label': '订单号'
            },
            {
            'name': '',
            'prop': 'addr_name',
            'type': 'text',
            'label': '付款人'
            },
            {
            'name': '',
            'prop': 'addr_phone',
            'type': 'text',
            'label': '付款人电话'
            },
            {
            'name': '',
            'prop': 'addr_address',
            'type': 'text',
            'label': '付款人地址'
            }
        ],
       'tarbars': {
           'prop': 'status',
           'data': [{
               'value': '3',
               'count': 0,
               'label': '已付款'
           }, {
               'value': '5',
               'count': 0,
               'label': '已发货'
           },
           {
               'value': '9',
               'count': 0,
               'label': '已完成'
           }]
       },
        'tableFields': [
            { 'prop': 'order_no', 'minWidth': '', 'width': '120', 'append_table_cover': 0, 'label': '订单号' },
            { 'prop': 'products.name', 'minWidth': '180', 'width': '', 'append_table_': 0, 'label': '产品名称' },

            { 'prop': 'integral', 'minWidth': '', 'width': '100', 'align': 'center', 'append_table_': 0, 'label': '积分' },
            { 'prop': 'num', 'minWidth': '', 'width': '60', 'align': 'center', 'append_table_': 0, 'label': '数量' },
            { 'prop': 'addr_name', 'minWidth': '', 'width': '100', 'append_table_': 0, 'label': '购买者' },
            { 'prop': 'addr_phone', 'minWidth': '', 'width': '120', 'append_table_': 0, 'label': '购买者手机号码' },
            { 'prop': 'addr_address', 'minWidth': '120', 'width': '', 'append_table_': 0, 'label': '购买者地址' },
            { 'prop': 'getShipping', 'minWidth': '120', 'width': '', 'append_table_': 0, 'label': '送货方式' },
            { 'prop': 'payed_at', 'minWidth': '', 'width': '100', 'append_table_': 0, 'label': '支付日期' }

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
