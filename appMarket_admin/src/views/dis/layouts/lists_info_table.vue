<template>
    <section>
        <el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" v-loading="data.listLoading">
            <el-table-column label="推荐人" width="90">
                <template scope="scope">
                    <div v-html="scope.row.getReferrer"></div>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名/手机号码" width="120">
                <template scope="scope">{{ scope.row.name }}
                    <br>{{ scope.row.phone }}</template>
            </el-table-column>
            <el-table-column prop="getStatus" label="状态" width="60"> </el-table-column>
            <el-table-column prop="amount" label="累计佣金" width="80"> </el-table-column>
            <el-table-column label="下级分销商" width="100">
                <template scope="scope">一级:{{ scope.row.downCount.one }}<br><span v-if="scope.row.downCount.two">二级:{{ scope.row.downCount.two }}</span></template>
            </el-table-column>
            <el-table-column prop="clientCount" label="客户数" width="80"> </el-table-column>
            <el-table-column prop="orderCount" label="订单数" width="80"> </el-table-column>
            <el-table-column label="日期" width="170">
                <template scope="scope">{{ scope.row.created_at }}</template>
            </el-table-column>
            <el-table-column label="操作" min-width="300">
                <template scope="scope">
                    <el-button size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    <el-button size="mini" @click="showDownDis(scope.$index, scope.row)" v-if="scope.row.downCount.one>0">查看下级分销商</el-button>
                    <el-button size="mini" @click="showClient(scope.$index, scope.row)">查看客户</el-button>
                    <el-button size="mini"  @click="showOrder(scope.$index, scope.row)">查看分销订单</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="clientTitle" :visible.sync="dialogClientVisible2" size="large" append-to-body :modal="false">
            <my-client ref="myclient2"> </my-client>
        </el-dialog>
        <el-dialog :title="orderTitle" :visible.sync="dialogOrderVisible" size="large" append-to-body>
            <my-order-info ref="myOrder"> </my-order-info>
        </el-dialog>
    </section>
</template>
<script type="text/javascript">
import myclient from './client_info.vue'
export default {
    data() {
        return {
            listDataDown: [],
            dialogClientVisible2: false,
            data: this.formatData(this),
            formAction: '/admin/shop/dis/lists',
            clientTitle:'查看客户',
            disTitle:'',
            orderTitle:'',
            dialogOrderVisible:false

        }
    },
    methods: {
        handleDel: function(index, item) {
            this.del_vuex(item, index, this);
        },
        showOrder(index, item) {
            this.orderTitle = item.name+'的分销订单';
            this.dialogOrderVisible = true;
            setTimeout(() => {
                this.$refs.myOrder.ajax(item.id);
            }, 500)
        },
        showClient(index, item) {
            console.log(this.$parent);
            this.clientTitle = item.name;
            this.dialogClientVisible2 = true;
            setTimeout(() => {
                this.$refs.myclient2.ajax(item.id);
            }, 500)
        },
        showDownDis(index, item) {
            this.ajax(item.id);
        },
        ajax(fid) {
            this.getAjax(this, { fid: fid }, msg => {});
        }
    },
    components: {
        'my-client': myclient,
        'my-order-info': resolve => require(['./order_lists'], resolve),
    }
}

</script>
