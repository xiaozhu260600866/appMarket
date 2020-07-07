<template>
    <el-dialog title="变更上级人员" :visible.sync="dialogFormVisible" :top="top" :before-close="handleClose">
        
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin:20px;width:60%;min-width:600px;">
            <el-form-item >
                <my-search placeholder="请输入经销商电话" tablename="distributions" searchfield="name" v-model="ruleForm.fname" ref="searchClient" style="width:100%" :formAction="'/ajax/vue-search'" @callback="searchCallBack" :fieldArr="[
                           {prop:'name',label:'姓名'},
                           {prop:'phone',label:'电话'},
                           {prop:'created_at',label:'时间'} 
                         ]" />
            </el-form-item>
            <el-form-item >
                <el-button type="primary" @click="submitForm('ruleForm')">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
export default {
    props: ['top'],
    data() {
        return {
            ruleForm: {},
            formAction: '/admin/shop/dis/changeParent',
            dialogFormVisible: false,
            integral: 0,
        };
    },
    methods: {
        submitForm(formName) {
            this.$emit('callBack',{name:this.ruleForm.disName,id:this.ruleForm.fid});
             this.dialogFormVisible = false;
        },
        searchCallBack(res) {
            this.ruleForm.fid = res.id;
            this.ruleForm.disName = res.name;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        ajax: function(params) {
            this.dialogFormVisible = true;
            this.$set(this.ruleForm,'selectType',1);
        },
        handleClose() {
            this.dialogFormVisible = false;
        }
    },
}

</script>
