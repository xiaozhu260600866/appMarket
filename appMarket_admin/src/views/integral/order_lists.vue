<template>
  <section>
    <el-col :span="24" class="toolbar t-search float-r">
      <el-form :inline="true" :model="data.query">
        <el-col :span="4">
          <el-input v-model="data.query.addr_name" placeholder="姓名" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="data.query.addr_phone" placeholder="电话" />
        </el-col>
        <el-form-item>
          <el-button type="primary" @click="ajax">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col v-if="data.show" :span="24">
      <el-tabs v-model="data.query.status" type="card" @tab-click="ajax">
        <el-tab-pane :label="'已付款('+data.status3Num+')'" :name="''+3" />
        <el-tab-pane :label="'发货中('+data.status5Num+')'" :name="''+5" />
        <el-tab-pane :label="'已完成('+data.status9Num+')'" :name="''+9" />
      </el-tabs>
    </el-col>
    <el-table ref="multipleTable" v-loading="data.listLoading" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange">
      <el-table-column type="selection" width="50" />
      <el-table-column prop="order_no" label="编号" width="110" />
      <el-table-column prop="addr_name" label="姓名" width="80" />
      <el-table-column label="呢称" width="100">
        <template scope="scope">{{ scope.row.user?scope.row.user.nickname :'该用户已被删除' }}</template>
      </el-table-column>
      <el-table-column prop="addr_phone" label="电话" width="115" />
      <el-table-column label="地址" min-width="120">
        <template scope="scope"> {{ scope.row.addr_city }}-{{ scope.row.addr_area }}-{{ scope.row.addr_address }}</template>
      </el-table-column>
      <el-table-column label="商品" min-width="120">
        <template scope="scope"> <span>{{ scope.row.products ? scope.row.products.name :'该产品已被删除' }}</span></template>
      </el-table-column>
      <el-table-column align="center" prop="num" label="数量" width="60" />
      <el-table-column prop="getShipping" label="发货方式" width="80" />
      <el-table-column label="日期" width="165">
        <template scope="scope">{{ scope.row.created_at }}</template>
      </el-table-column>
      <el-table-column label="操作" width="170">
        <template scope="scope">
          <el-button type="primary" size="mini" @click="$router.push({path:'/vueadmin/integral/order-info?id='+scope.row.id})">详情</el-button>
          <el-button size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="toolbar foot-tool">
      <el-button type="danger" :disabled="this.sels.length===0 " @click="delAll">批量删除</el-button>
      <el-pagination :current-page="data.thisPage" :page-sizes="[6]" :page-size="6" layout="total, sizes, prev, pager, next, jumper" :total="data.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </section>
</template>
<script type="text/javascript">
export default {
    components: {

    },
    data() {
        return {
            formAction: '/admin/shop/integral/order-lists',
            data: this.formatData(this),
            siteName: this.getSiteName(),
            tableName: 'integral_orders',
            status: this.getOptions('status'),
            sels: [], // 列表选中列,
            searchFields: {
                addr_name: ''
            }
        }
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'ajax'
    },
    mounted() {
        this.ajax()
    },
    methods: {
        ajax() {
            this.getAjax(this, { status: this.status }, msg => {})
        },
        selsChange: function(sels) {
            this.sels = sels
        },
        toSearch() {
            this.searchField(this)
        },
        handleSizeChange(val) {
            this.data.nextPage = val
            this.ajax()
        },
        handleCurrentChange(val) {
            this.data.nextPage = val
            this.ajax()
        },
        handleDel(index, item) {
            this.del_vuex(item, index, this)
        },
        delAll() { /* 批量删除*/
            this.deleteAll(this)
        },
        searchCallBack(res) {
            this.searchFields.user_id = res.id
        },
        clickStatus(tab, event) {
            this.status = tab.name
            this.ajax()
        }
    }

}

</script>
