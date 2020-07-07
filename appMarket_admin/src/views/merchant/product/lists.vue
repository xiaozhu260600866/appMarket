<template>
  <div>
    <dx-table :data="data" :global-data="globalData" :operate-width="320" @submitBeforeCallBack="submitBeforeCallBack">
      <div slot="append_table_cover" slot-scope="scope" class="proCover">
        <img class="img" :src="scope.row.firstCover" alt="" style="width: 40px;height: 40px;border-radius: 3px;">
      </div>
      <div slot="operate" slot-scope="scope">
        <div>
          <el-button size="mini" @click="goto('/merchant/product-edit?id='+scope.row.id)">编辑</el-button>
        </div>
      </div>
      <div slot="headerR">
        <el-button type="success" @click="goto('/merchant/product-create')">新建</el-button>
      </div>
    </dx-table>
    <qrcode ref="qrcode" />

    <!-- <dx-create-edit  ref="createEdit" :fields="globalData.data.formFields" :data="data" noDialog="true" createEditLabel="120px">
         	  <div slot="content" slot-scope="scope">
         		   <slot :name="scope.field" :row="scope.row"/>
         	  </div>
         </dx-create-edit> -->
  </div>
</template>
<script type="text/javascript">
    import globalData from './layouts/product.js'
    export default {
        components: {
            'dx-table': resolve => require(['xiaozhu/elementAdmin/components/dx_table.vue'], resolve)
            // "dx-create-edit": resolve => require(["xiaozhu/elementAdmin/components/create_edit.vue"], resolve),
        },
        data() {
            return {
                formAction: '/admin/merchant/product/lists',
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
