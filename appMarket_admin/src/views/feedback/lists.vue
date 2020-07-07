<template>
    <div>
   <!--    <dx-table :data="data" :globalData="globalData" @submitBeforeCallBack="submitBeforeCallBack" :operateWidth="280">

            <div slot="operate" slot-scope="scope">
                <div>
                    <el-button size="mini" @click="qrcode(scope.row)">查看二维码</el-button>
                </div>
            </div>
            <div slot="header">
                <el-button type="success" @click="exportExcel">导出</el-button>
            </div>
         </dx-table>
         <qrcode ref="qrcode"></qrcode> -->

         <dx-create-edit  ref="createEdit" :fields="globalData.data.formFields" :data="data" noDialog="true" createEditLabel="120px">
         	  <div slot="content" slot-scope="scope">
         		   <slot :name="scope.field" :row="scope.row"/>
         	  </div>
         </dx-create-edit>
    </div>
</template>
<script type="text/javascript">
    import globalData from "./layouts/feedbacks.js";
    export default {
        data() {
            return {
                formAction: "/admin/user/lists?role=7",
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
            exportExcel() {
                let url = this.urlApendOpenid("/admin/user/export2", this);
                window.open(this.siteName + url,"_blank");
            },
            submitBeforeCallBack(ruleform){
                delete ruleform.api_token;
                console.log(ruleform);
                this.$set(ruleform,"role",7);
            },
            ajax() {
                this.getAjax(this, {}, msg => {
                  this.$nextTick(()=>{
                    this.$refs.createEdit.ajax('',this.data,this.globalData.data.formFields);
                  })
                });
            },
        },
        components: {
            "dx-table": resolve => require(["xiaozhu/elementAdmin/components/dx_table.vue"], resolve),
            "dx-create-edit": resolve => require(["xiaozhu/elementAdmin/components/create_edit.vue"], resolve),
        }
    }
</script>
