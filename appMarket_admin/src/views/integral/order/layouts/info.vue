<template>
  <!-- 上传规格 -->
  <el-dialog title="修改订单内容" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose" />
</template>
<script type="text/javascript">
export default {
    // props: ['type', 'ruleForm', 'formAction'],
    data() {
        return {
            dialogVisible: false
        }
    }, // 父类的数据
    methods: {
        handleClose: function(done) {
            this.dialogVisible = false
        },
        ajax() {
            this.dialogVisible = true
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.type = this.type
                    this.postAjax(this.formAction, this.ruleForm, msg => {
                        // if (msg.data.status == 2) {
                        //     this.getSuccess('操作成功')
                        //     this.$parent.ajax()
                        //     this.dialogVisible = false
                        // }
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
        /* 商品规格结束*/
    }

}

</script>
