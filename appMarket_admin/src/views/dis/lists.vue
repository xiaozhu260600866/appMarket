<template>
    <section>
      
        <dx-table :data="data" :globalData="globalData" :operateWidth="180">
            <div slot="append_table_getReferrer" slot-scope="scope">
                <div v-html="scope.row.getReferrer"></div>
            </div>
            <div slot="append_table_name" slot-scope="scope">
                {{ scope.row.name }}
                <br>{{ scope.row.phone }}
            </div>
            <div slot="append_table_downCount" slot-scope="scope">
                一级：{{ scope.row.downCount.one }}<br><span v-if="scope.row.downCount.two">二级：{{ scope.row.downCount.two }}</span>
            </div>
            <div slot="append_table_status" slot-scope="scope">
                <div v-if="scope.row.status == 0">
                    <el-button size="mini" type="primary" @click="changeStatus(scope.$index, scope.row,'1')">通过</el-button>
                    未审核
                </div>
                <div v-else>已审核</div>
            </div>
            <div slot="operate" slot-scope="scope">
                <el-dropdown class="ml10">
                    <el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="$router.push('/vueadmin/user/info?user_id='+scope.row.user_id)">会员详情</el-dropdown-item>
                        <el-dropdown-item @click.native="showDownDis(scope.$index, scope.row)" v-if="scope.row.downCount.one>0">下级分销商</el-dropdown-item>
                        <el-dropdown-item @click.native="showClient(scope.$index, scope.row)">客户</el-dropdown-item>
                        <el-dropdown-item @click.native="showOrder(scope.$index, scope.row)">分销订单</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </dx-table>
        <el-dialog :title="disTitle" :visible.sync="dialogTableVisible" size="large">
            <my-down-dis ref="mytable"> </my-down-dis>
        </el-dialog>
        <el-dialog :title="clientTitle" :visible.sync="dialogClientVisible" size="large">
            <my-client-info ref="myclient"> </my-client-info>
        </el-dialog>
        <el-dialog :title="orderTitle" :visible.sync="dialogOrderVisible" size="large">
            <my-order-info ref="myOrder"> </my-order-info>
        </el-dialog>

        <my-changeParent ref="changeParent"> </my-changeParent>
    </section>
</template>
<script type="text/javascript">
    import globalData from "./layouts/dis.js";
    export default {
        data() {
            return {
                formAction: '/admin/dis/lists?status=1',
                data: this.formatData(this),
                siteName: this.getSiteName(),
                dialogTableVisible: false,
                dialogClientVisible: false,
                dialogOrderVisible: false,
                clientTitle: '',
                orderTitle: '',
                disTitle: '查看下级分销商',
                globalData: globalData
            }
        },
        mounted() {
            this.ajax();
        },
        methods: {
            ajax() {
                this.getAjax(this, {
                    status: this.data.query.status
                }, msg => {});
            },
            showDownDis(index, item) {
                this.disTitle = item.name + '的下级分销商';
                let fid = item.id;
                this.dialogTableVisible = true;
                setTimeout(() => {
                    this.$refs.mytable.ajax(fid);
                }, 500)
            },
            showClient(index, item) {
                this.clientTitle = item.name + '所属客户';
                this.dialogClientVisible = true;
                setTimeout(() => {
                    this.$refs.myclient.ajax(item.id);
                }, 500)
            },
            showOrder(index, item) {
                this.orderTitle = item.name + '的分销订单';
                this.dialogOrderVisible = true;
                setTimeout(() => {
                    this.$refs.myOrder.ajax(item.id);
                }, 500)
            },
        },
        components: {
            'my-down-dis': resolve => require(['./layouts/lists_info_table'], resolve),
            'my-client-info': resolve => require(['./layouts/client_info'], resolve),
            'my-order-info': resolve => require(['./layouts/order_lists'], resolve),
            'my-changeParent': resolve => require(['./layouts/changeParent'], resolve),
            'dx-table': resolve => require(['xiaozhu/elementAdmin/components/dx_table.vue'], resolve),
        }

    }
</script>
