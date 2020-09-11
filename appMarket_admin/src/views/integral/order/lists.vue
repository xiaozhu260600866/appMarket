<template>
  <div>
    <dx-table :data="data" :global-data="globalData" :operate-width="180" @submitBeforeCallBack="submitBeforeCallBack">
      <div slot="operate" slot-scope="scope">
        <div>
          <el-button type="primary" size="mini" @click="goto('/integral/order-info?id='+scope.row.id)">详情</el-button>
        </div>
      </div>
    </dx-table>
  </div>
</template>
<script type="text/javascript">
    import globalData from './layouts/order.js'
    export default {
        components: {
            'dx-table': resolve => require(['xiaozhu/elementAdmin/components/dx_table.vue'], resolve)

        },
        data() {
            return {
                formAction: '/admin/integral/order-lists',
                data: this.formatData(this),
                siteName: this.getSiteName(),
                globalData: globalData
            }
        },
        watch: {
            '$route': 'ajax'
        },
        mounted() {
          setTimeout(() => {
            this.ajax()
          }, 200)
        },
        methods: {

            submitBeforeCallBack(ruleform) {
                delete ruleform.api_token
                console.log(ruleform)
                this.$set(ruleform, 'role', 7)
            },
            ajax() {
                this.getAjax(this, {}, msg => {

                })
            }
        }
    }
</script>
