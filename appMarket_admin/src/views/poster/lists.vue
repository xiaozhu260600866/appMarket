<template>
    <div>
      <dx-table :data="data" :globalData="globalData" @submitBeforeCallBack="submitBeforeCallBack" :operateWidth="280">    </dx-table>
    </div>
</template>
<script type="text/javascript">
    import globalData from "./layouts/poster.js";
    export default {
        data() {
            return {
                formAction: "/admin/poster/lists",
                data: this.formatData(this),
                siteName: this.getSiteName(),
                globalData: globalData,
            }
        },
        mounted() {

            this.ajax();
        },
        watch: {
            "$route": "ajax"
        },
        methods: {

            submitBeforeCallBack(ruleform){
                this.$set(ruleform,"type",this.data.query.type);
            },
            ajax() {
                this.getAjax(this, {}, msg => {
                  // this.$nextTick(()=>{
                  //   this.$refs.createEdit.ajax('',this.data,this.globalData.data.formFields);
                  // })
                });
            },
        },
        components: {
            "dx-table": resolve => require(["xiaozhu/elementAdmin/components/dx_table.vue"], resolve),
            //"dx-create-edit": resolve => require(["xiaozhu/elementAdmin/components/create_edit.vue"], resolve),
        }
    }
</script>
