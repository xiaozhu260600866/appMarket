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
            'prop': 'name',
            'type': 'text',
            'label': '产品名称'
            },
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
               'value': 3,
               'count': 0,
               'label': '已付款'
           }, {
               'value': 4,
               'count': 0,
               'label': '商家已接单'
           }, {
               'value': 5,
               'count': 0,
               'label': '骑手已接单'
           },
           {
               'value': 9,
               'count': 0,
               'label': '已完成'
           },
           {
               'value': 0,
               'count': 0,
               'label': '已取消'
           }]
       },
        'tableFields': [
            { 'prop': 'order_no', 'width': '110', 'append_table_cover': 0, 'label': '订单号' },
            { 'prop': 'product_str', 'minWidth': '180', 'append_table_': 0, 'label': '产品名称' },
            { 'prop': 'getMerchant.name', 'minWidth': '80', 'append_table_': 0, 'label': '商家名称' },
            { 'prop': 'amount', 'width': '100', 'align': 'center', 'append_table_': 0, 'label': '金额' },
            { 'prop': 'num', 'width': '60', 'align': 'center', 'append_table_': 0, 'label': '数量' },
            { 'prop': 'addr_name', 'width': '100', 'append_table_': 0, 'label': '购买者' },
            { 'prop': 'addr_phone', 'width': '120', 'append_table_': 0, 'label': '购买者手机号码' },
            { 'prop': 'addr_address', 'minWidth': '120', 'append_table_': 0, 'label': '购买者地址' },
            { 'prop': 'merchant_at', 'width': '110', 'append_table_': 0, 'label': '商家接单时间' },
            { 'prop': 'horse_at', 'width': '110', 'append_table_': 0, 'label': '骑手接单时间' },
            { 'prop': 'payed_at', 'width': '100', 'append_table_': 0, 'label': '支付日期' }

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
