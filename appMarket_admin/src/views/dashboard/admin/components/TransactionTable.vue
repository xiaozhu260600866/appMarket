<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column prop="name" label="销售单" min-width="200"></el-table-column>
    <el-table-column prop="customerName" label="客户" min-width="200"></el-table-column>
    <el-table-column prop="delivery_date" label="交货日期" width="100" align="center"></el-table-column>
    <el-table-column label="状态" width="100" align="center">
      <template slot-scope="scope">
        <el-tag type="info" v-if="scope.row.status===0">{{ scope.row.statusName }}</el-tag>
        <el-tag type="warning" v-if="scope.row.status===1">{{ scope.row.statusName }}</el-tag>
        <el-tag type="danger" v-if="scope.row.status===2">{{ scope.row.statusName }}</el-tag>
        <el-tag v-if="scope.row.status===3">{{ scope.row.statusName }}</el-tag>
        <el-tag type="success" v-if="scope.row.status===8">{{ scope.row.statusName }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

import { lists } from '@/api/sales/order'
export default {
  data() {
    return {
      list: null
    }
  },
  mounted(){
    lists(this.listQuery).then(res => {
      this.list = res.data.lists.data;
    })
  },
  methods: {
    
  }
}
</script>
