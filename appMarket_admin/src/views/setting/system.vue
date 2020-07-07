<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div class="dx-container">
          <tyt-page-header content="网站配置开始"></tyt-page-header>
          <div class="dx-main">
            <div class="list-box">
              <el-form :model="ruleForm" ref="ruleForm" label-width="150px" class="demo-ruleForm pt20" style="margin: 0;width:100%;min-width:600px;">
                <el-tabs v-model="activeName2" >
                  <!-- 网站配置开始 -->
                  <el-tab-pane label="网站配置" name="first">
                    <div class="pt20">
                      <el-form-item label="联系人" prop="contacts" :rules="[{ required: true, message: '内容不能为空'},]">
                        <el-input v-model="ruleForm.contacts" class="CinputWidth"></el-input>
                      </el-form-item>
                      <el-form-item label="联系电话" prop="phone" :rules="[{ required: true, message: '内容不能为空'},]">
                        <el-input v-model="ruleForm.phone" class="CinputWidth"></el-input>
                      </el-form-item>
                      <el-form-item label="公司名称" prop="web_name" :rules="[{ required: true, message: '内容不能为空'},]">
                        <el-input v-model="ruleForm.web_name" class="CinputWidth"></el-input>
                      </el-form-item>
                      <el-form-item label="公司地址" prop="address">
                        <el-input v-model="ruleForm.address" class="CinputWidth"></el-input>
                        <el-button @click.prevent="chooseLocation()">重新定位</el-button>
                      </el-form-item>
                    </div>
                    <div class="el-form-item">
                      <label class="el-form-item__label" style="width: 150px">公司LOGO</label>
                      <my-upload upurl="product" :uploadLength="1" :fileList="ruleForm.web_logo" :sizearr="300"></my-upload>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="学历" name="sixth">
                  	<category :lists="data.category" actionPrefix="admin/system" actionUrl="/admin/system" type="0" :canupload="false" :hasSon="false"></category>
                  </el-tab-pane>
                  <el-tab-pane label="月薪" name="sixth2">
                  	<category :lists="data.category" actionPrefix="admin/system" actionUrl="/admin/system" type="1" :canupload="false" :hasSon="false"></category>
                  </el-tab-pane>
                </el-tabs>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
                <chooseLocation ref="chooseLocation" @callBack="locationCallBack"></chooseLocation>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>
<style type="text/css">
  .CinputWidth {
    width: 500px;
  }

  .CinputWidth .el-input__inner {
    border-color: #dcdfe6 !important;
  }

  .OinputWidth {
    width: 100px;
  }

  .OinputWidth .el-input__inner {
    border-color: #dcdfe6 !important;
  }
</style>
<script>
  import chooseLocation from "xiaozhu/vue/components/admin/chooseLocation";;
  import category from "xiaozhu/vue/components/admin/category.vue";
  export default {
    mounted: function() {
      this.ajax();
    },
    data() {
      return {
        ruleForm: {
          order_deadline: 0,
          order_autook: 0,
          is_make_menu: false,
          is_siginin: false
        },
        formAction: '/admin/system/config',
        activeName2: 'first',
        dialogVisible: false,
        getSiteName: this.getSiteName(),
        data: this.formatData(this)
      };
    },
    methods: {
      chooseLocation() {
        this.$refs.chooseLocation.ajax();
      },
      locationCallBack(res) {
        if (res.latlng) {
          this.$refs.chooseLocation.handleClose();
          this.ruleForm.address = res.poiaddress;
          this.ruleForm.location_x = res.latlng.lng;
          this.ruleForm.location_y = res.latlng.lat;

        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.ruleForm.end_date && typeof this.ruleForm.end_date == "object") {
              this.ruleForm.end_date = this.dateToString(this.ruleForm.end_date, "dateTime");
            }
            this.postAjax(this.formAction, this.ruleForm, function(msg) {})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      toBing() {
        this.dialogVisible = true;
        this.$refs.qrcode.getQrcode();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      ajax: function() {
        this.getAjax(this, {}, msg => {
          if ("detail" in msg) {
            this.ruleForm = msg.detail;
            this.ruleForm.web_logo = this.ruleForm.web_logo ? this.splitCover(this.ruleForm.web_logo,
              "product") : [];
            this.ruleForm.wechat_logo = this.ruleForm.wechat_logo ? this.splitCover(this.ruleForm
              .wechat_logo, "product") : [];
            this.ruleForm.card_user_id_default = parseInt(this.ruleForm.card_user_id_default);
          }
        });

      },
    },
    components: {
      chooseLocation,
      category
    }
  }
</script>
