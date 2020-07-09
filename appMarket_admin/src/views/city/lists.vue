<template>
  <div>
    <dx-table :data="data" :global-data="globalData" :operate-width="240" @submitBeforeCallBack="submitBeforeCallBack">
      <div slot="operate" slot-scope="scope">
        <el-button type="primary" size="small" @click="toDown(scope.row)">下级城市</el-button>
      </div>
    </dx-table>
  </div></template>
<script type="text/javascript">
    import globalData from './layouts/city.js'
    export default {
        components: {
            'dx-table': resolve => require(['xiaozhu/elementAdmin/components/dx_table.vue'], resolve)
            // "dx-create-edit": resolve => require(["xiaozhu/elementAdmin/components/create_edit.vue"], resolve),
        },
        data() {
            return {
                formAction: '/admin/city/lists',
                data: this.formatData(this),
                siteName: this.getSiteName(),
                globalData: globalData,
                lev: 1
            }
        },
        watch: {
            '$route': 'ajax'
        },
        mounted() {
          if (this.data.query.lev && this.data.query.lev == 2) {
            this.globalData.data.tableFields[1].label = '市级城市'
          }
          if (this.data.query.lev && this.data.query.lev == 3) {
            this.globalData.data.tableFields[1].label = '区级城市'
          }
            setTimeout(() => {
              this.ajax()
            }, 100)
        },
        methods: {
            toDown(row) {
               let lev = this.data.query.lev ? parseInt(this.data.query.lev) : 1
               lev += 1
              window.open('http://localhost:9527/panel/#/setting/city?fid=' + row.id + '&lev=' + lev)
            },
            submitBeforeCallBack(ruleform) {
                this.$set(ruleform, 'fid', this.data.query.fid)
            },
            ajax() {
                this.getAjax(this, { }, msg => {
                  // this.$nextTick(()=>{
                  //   this.$refs.createEdit.ajax('',this.data,this.globalData.data.formFields);
                  // })
                })
            }
        }
    }
</script>
