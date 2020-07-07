<template>
  <div>
    <dx-create-edit ref="createEdit" create-action="/admin/merchant/product/create" edit-action="/admin/merchant/product/edit" :fields="globalData.data.formFields" :data="data" no-dialog="true" create-edit-label="120px">
      <div slot="append_form_auto_putaway" slot-scope="scope">
        <div class="flex flex-middle">
          <el-switch v-model="scope.row.auto_putaway" on-text="" off-text="" :active-value="1" :inactive-value="0" />
          <el-form-item v-if="scope.row.auto_putaway" label="上架日期" class="flex">
            <el-date-picker v-model="scope.row.putaway_date" type="date" placeholder="选择上架日期" />
          </el-form-item>
        </div>
      </div>
      <div slot="append_form_auto_group" slot-scope="scope">
        <div class="flex flex-middle">
          <el-switch v-model="scope.row.auto_group" on-text="" off-text="" :active-value="1" :inactive-value="0" />
          <el-form-item v-if="scope.row.auto_group" label="拼团价" class="flex">
            <el-input v-model="scope.row.group_price" placeholder="选择拼团价" />
          </el-form-item>
          <el-form-item v-if="scope.row.auto_group" label="拼团人数" class="flex">
            <el-input v-model="scope.row.group_num" placeholder="选择拼团人数" />
          </el-form-item>
        </div>
      </div>
    </dx-create-edit>
  </div>
</template>
<script type="text/javascript">
    import globalData from './layouts/product.js'
    export default {
        components: {
            'dx-create-edit': resolve => require(['xiaozhu/elementAdmin/components/create_edit.vue'], resolve)
        },
        data() {
            return {
                formAction: '/admin/merchant/product/create',
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
                  this.$nextTick(() => {
                    this.$refs.createEdit.ajax(msg.detail ? msg.detail : '', this.data, this.globalData.data.formFields)
                  })
                })
            }
        }
    }
</script>
