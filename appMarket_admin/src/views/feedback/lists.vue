<template>
  <div>
    <dx-table :data="data" :global-data="globalData" :operate-width="280" @submitBeforeCallBack="submitBeforeCallBack" />
  </div>
</template>
<script type="text/javascript">
    import globalData from './layouts/feedbacks.js'
    export default {
        components: {
            'dx-table': resolve => require(['xiaozhu/elementAdmin/components/dx_table.vue'], resolve)
        },
        data() {
            return {
                formAction: '/admin/feedback/lists',
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
            ajax() {
                this.getAjax(this, {}, msg => {

                })
            }
        }
    }
</script>
