<template>
  <div>
    <dx-table :data="data" :global-data="globalData" :operate-width="260" @createBeforeCallBack="createBeforeCallBack">
      <div slot="append_form_city" slot-scope="scope">
        <el-cascader
          v-model="scope.row.city"
          placeholder="请输入要搜索的分类"
          expand-trigger="hover"
          :options="data.citys"
          style="width:300px"
          @change="changeCity(scope.row.city)"
        />
      </div>
    </dx-table>
  </div>
</template>
<script type="text/javascript">
    import globalData from './layouts/deliver.js'
    export default {
        components: {
            'dx-table': resolve => require(['xiaozhu/elementAdmin/components/dx_table.vue'], resolve)
            // "dx-create-edit": resolve => require(["xiaozhu/elementAdmin/components/create_edit.vue"], resolve),
        },
        data() {
            return {
                formAction: '/admin/deliver/lists',
                data: this.formatData(this),
                siteName: this.getSiteName(),
                globalData: globalData
            }
        },
        watch: {
            '$route': 'ajax'
        },
        mounted() {
            this.ajax()
        },
        methods: {
            changeCity(value) {
               const fclass = value[value.length - 1 ]
               this.postAjax('/admin/merchant/searchMarket', { fclass: fclass }).then(msg => {
                   this.data.market = msg.data.lists.data
                   this.data.market.forEach(v => {
                      v.label = v.name
                      v.value = v.id
                   })
               })
            },
            createBeforeCallBack(ruleform) {
               if (ruleform.id) {
                   this.postAjax('/admin/merchant/searchMarket', { id: ruleform.market_id }).then(msg => {
                       this.data.market = msg.data.lists.data
                       this.data.market.forEach(v => {
                          v.label = v.name
                          v.value = v.id
                       })
                   })
               }
            },
            ajax() {
                this.getAjax(this, {}, msg => {
                  // this.$nextTick(()=>{
                  //   this.$refs.createEdit.ajax('',this.data,this.globalData.data.formFields);
                  // })
                })
            }
        }
    }
</script>
