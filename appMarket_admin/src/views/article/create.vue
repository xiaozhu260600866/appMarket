<template>
    <div>
        <dx-create-edit  ref="createEdit" createAction="/admin/article/create" editAction="/admin/article/edit" :fields="globalData.data.formFields" :data="data" noDialog="true" createEditLabel="120px">
         	  <div slot="content" slot-scope="scope">
         		   <slot :name="scope.field" :row="scope.row"/>
         	  </div>
         </dx-create-edit>
    </div>
</template>
<script type="text/javascript">
    import globalData from "./layouts/article.js";
    export default {
        data() {
            return {
                formAction: "/admin/article/create",
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
                  this.$nextTick(()=>{

                    this.$refs.createEdit.ajax(msg.detail ? msg.detail : '',this.data,this.globalData.data.formFields);
                  })
                });
            },
        },
        components: {
            "dx-create-edit": resolve => require(["xiaozhu/elementAdmin/components/create_edit.vue"], resolve)
        }
    }
</script>
