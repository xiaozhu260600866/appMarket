<template>
  <div>
    <dx-table :data="data" :global-data="globalData" :operate-width="100" @submitBeforeCallBack="submitBeforeCallBack">
      <div slot="operate" slot-scope="scope">
        <div>
          <el-button size="mini" @click="goto('/article/edit?id='+scope.row.id)">编辑</el-button>
        </div>
      </div>
      <div slot="append_table_headerPic" slot-scope="scope">
        <div>
          <img :src="scope.row.headerPic" alt="">
        </div>
      </div>
    </dx-table>
    <qrcode ref="qrcode" />
  </div>
</template>
<script type="text/javascript">
    import globalData from './layouts/users.js'
    export default {
        components: {
            'dx-table': resolve => require(['xiaozhu/elementAdmin/components/dx_table.vue'], resolve)
            // "dx-create-edit": resolve => require(["xiaozhu/elementAdmin/components/create_edit.vue"], resolve),
        },
        data() {
            return {
                formAction: '/admin/user/lists?role=2',
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

            submitBeforeCallBack(ruleform) {
                delete ruleform.api_token
                console.log(ruleform)
                this.$set(ruleform, 'role', 7)
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
