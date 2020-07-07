<template>
    <div>
      <dx-table :data="data" :globalData="globalData" @submitBeforeCallBack="submitBeforeCallBack" :operateWidth="280">

            <div slot="operate" slot-scope="scope">
                <div>
                    <el-button size="mini" @click="goto('/article/edit?id='+scope.row.id)">编辑</el-button>
                </div>
            </div>
            <div slot="headerR">
                <el-button type="success" @click="goto('/article/create')">新建</el-button>
            </div>
         </dx-table>
         <qrcode ref="qrcode"></qrcode>

        <!-- <dx-create-edit  ref="createEdit" :fields="globalData.data.formFields" :data="data" noDialog="true" createEditLabel="120px">
         	  <div slot="content" slot-scope="scope">
         		   <slot :name="scope.field" :row="scope.row"/>
         	  </div>
         </dx-create-edit> -->
    </div>
</template>
<script type="text/javascript">
    import globalData from "./layouts/article.js";
    export default {
        data() {
            return {
                formAction: "/admin/article/lists",
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
                delete ruleform.api_token;
                console.log(ruleform);
                this.$set(ruleform,"role",7);
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
