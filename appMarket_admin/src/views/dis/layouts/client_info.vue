<template>
    <section>
        <el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" v-loading="data.listLoading">
             <el-table-column label="呢称" width="150">
                <template scope="scope">
                    <div>{{ scope.row.nickname ? scope.row.nickname[0] : '游客' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="姓名" width="150">
                <template scope="scope">
                    <div>{{ scope.row.name ? scope.row.name : '游客' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="电话" width="150">
                <template scope="scope">
                    <div>{{ scope.row.phone ? scope.row.phone : '' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="关注时间" width="200">
                <template scope="scope">{{ scope.row.created_at }}</template>
            </el-table-column>
        </el-table>
    </section>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            listDataDown: [],
            data: this.formatData(this),
            formAction: '/admin/shop/dis/client'
        }
    },
    methods: {
        handleDel: function(index, item) {
            this.del_vuex(item, index, this);
        },
        ajax(id) {
            this.getAjax(this, { id: id }, msg => {});
        }
    },
}

</script>
