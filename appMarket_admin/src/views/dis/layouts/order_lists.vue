<template>
    <section>
		<el-col :span="24" class="toolbar">
		    <el-form :inline="true" :model="data.query" style="text-align: -webkit-right;">
		        <el-date-picker type="daterange" placeholder="选择日期范围" v-model="data.query.created_at"> </el-date-picker>
		        <el-form-item>
		            <el-button type="primary" @click="ajax">查询</el-button>
		        </el-form-item>
		    </el-form>
		</el-col>
        <span>佣金:{{countData.amount}},笔数:{{countData.num}},订单金额:{{countData.orderAmount}}</span>
        <el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" v-loading="data.listLoading">
             <el-table-column label="分销商" width="80" v-if="order_no">
                <template scope="scope">
                    <div>{{ scope.row.dis ?   scope.row.dis.name : '' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="分销商电话" width="115" v-if="order_no">
                <template scope="scope">
                    <div>{{ scope.row.dis ?   scope.row.dis.phone : '' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="购买人" width="80">
                <template scope="scope">
                    <div>{{ scope.row.getOrder ? scope.row.getOrder.addr_name : '' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="产品" min-width="150">
                <template scope="scope">
                    <div>{{ scope.row.getOrder ?   scope.row.getOrder.product_str : '' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="订单金额" width="100">
                <template scope="scope">
                    <div>{{ scope.row.getOrder.amount ? scope.row.getOrder.amount : '' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="佣金" width="100">
                <template scope="scope">
                    <div>{{ scope.row.amount ? scope.row.amount : '' }}</div>
                </template>
            </el-table-column>
              <el-table-column label="状态" width="80">
                <template scope="scope">
                    <div>{{ scope.row.getStatus ? scope.row.getStatus : '' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="时间" width="110">
                <template scope="scope">{{ scope.row.created_at }}</template>
            </el-table-column>
        </el-table>
		<el-col :span="24" class="toolbar" style='margin:50px 0'>
		    <el-pagination @current-change="handleCurrentChange" :current-page="data.current_page" :page-sizes="[50]" :page-size="50" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'>
		    </el-pagination>
		</el-col>
    </section>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            listDataDown: [],
            order_no:'',
            countData : {
                amount:0,
                num:0,
                orderAmount:0},
            data: this.formatData(this),
            formAction: '/admin/shop/dis/commission'
        }
    },
    methods: {
		handleCurrentChange(val) {
		    this.page = val;
		    this.ajax(this.formAction);
		},
        handleDel: function(index, item) {
            this.del_vuex(item, index, this);
        },
        ajax(id,order_no) {
            this.countData.amount = 0;
            this.countData.num = 0;
            this.countData.orderAmount = 0;
            if(order_no){
                this.order_no = order_no;
                this.getAjax(this, { order_no: order_no}, msg => {
                    if(this.data.lists.length){
                        this.data.lists.forEach(v=>{
                           this.countData.amount+= parseFloat(v.amount);
                           this.countData.num ++;
                           this.countData.orderAmount += v.getOrder ? parseFloat(v.getOrder.amount) : 0
                        });

                         console.log(this.countData);
                    }

                });
            }else{
                 this.getAjax(this, { dis_id: id}, msg => {
                     if(this.data.lists.length){
                         this.data.lists.forEach(v=>{
                             this.countData.amount+= parseFloat(v.amount);
                             this.countData.num ++;
                             this.countData.orderAmount += v.getOrder ? parseFloat(v.getOrder.amount) : 0
                         });
                         console.log(this.countData);
                     }

                 });
            }

        }
    },
}

</script>
