<template>
  <div>
    <dx-create-edit ref="createEdit" create-action="/admin/integral/create" edit-action="/admin/integral/edit" :fields="globalData.data.formFields" :data="data" no-dialog="true" create-edit-label="120px">
      <div slot="content" slot-scope="scope">
        <slot :name="scope.field" :row="scope.row" />
      </div>
    </dx-create-edit>
  </div>
</template>
<script type="text/javascript">
    import globalData from './layouts/integral.js'
    export default {
        components: {
            'dx-create-edit': resolve => require(['xiaozhu/elementAdmin/components/create_edit.vue'], resolve)
        },
        data() {
            return {
                formAction: '/admin/integral/create',
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
