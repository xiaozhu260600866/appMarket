<template>
   <dx-create-edit  ref="createEdit" :createAction="formAction" :editAction="formAction" :fields="formFields" :data="data" noDialog="true" createEditLabel="180px">
    </dx-create-edit>
</template>
<style type="text/css" scoped>
.width80 {
    width: 80px;
}

.red {
    color: red;
    margin-right: 30px;
    padding-left: 5px
}

</style>
<script>

export default {
    components: {
        "dx-create-edit": resolve => require(["xiaozhu/elementAdmin/components/create_edit.vue"], resolve)
    },
    mounted() {
        this.ajax();
    },
    data() {
        return {
            ruleForm: {
                first_distor: 0,
                first_integral: 0,
                second_distor: 0,
                second_integral: 0,
                third_integral: 0,
                third_distor: 0,
                can_dis: 0,
                withdraw_amount: 0

            },
            formFields:[
              {prop:'first_distor',label:'一级佣金（比例%）',type:'text',datatype:'require|integer',column:2},
              {prop:'first_integral',label:'一级积分',type:'text',datatype:'require|integer'},
              {prop:'second_distor',label:'二级佣金（比例%）',type:'text',datatype:'require|integer',column:2},
              {prop:'second_integral',label:'二级积分',type:'text',datatype:'require|integer'},
              {prop:'third_distor',label:'三级佣金（比例%）',type:'text',datatype:'require|integer',column:2},
              {prop:'third_integral',label:'三级积分',type:'text',datatype:'require|integer'},
              {prop:'withdraw_amount',label:'最少提现（元）',type:'text',datatype:'require|price'},
            ],
            data: this.formatData(this),
            formAction: '/admin/dis/config',
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.remark = this.$refs.editor.getContent();
                    console.log(this.ruleForm);

                    this.postAjax(this.formAction, this.ruleForm, msg => {
                        if (msg.data.status == 2) {

                        }
                    }, )
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        ajax: function() {
            this.getAjax(this, {}, msg => {
                for (var i in msg.detail) {
                    this.ruleForm[i] = msg.detail[i];
                }
                this.ruleForm.share_logo = this.ruleForm.share_logo ? this.splitCover(this.ruleForm.share_logo, "dis") : [];
                this.$refs.createEdit.ajax(this.ruleForm,this.data,this.formFields);
            });
        },
    },
}

</script>
