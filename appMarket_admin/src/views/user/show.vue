<template>
	<div class="app-container">
		<el-row>
			<el-col :span="24">
				<div class="dx-container">
					<div class="p15"><el-page-header @back="goBack" content="会员详情"></el-page-header></div>
				</div>
			</el-col>
			<el-col :span="24" v-if="detailData.id">
				<div class="dx-container mt5">
					<div class="dx-main">
						<div class="dx-warning-box pointer" v-if="detailData.get_user_info.update_status==1" @click="cancelUpdateStatus">当前用户更新过了资料，点击取消提示</div>
						<div class="product-detail-info">
							<div class="info-left">
								<div class="cover"><el-image style="width: 100px; height: 100px" :src="detailData.avatarUrl"></el-image></div>
								<p class="center"><category-name :data="detailData"></category-name></p>
								<p class="center"><category-status :data="detailData"></category-status></p>
								<!-- <p align="center">
									<el-dropdown @command="handleCommand">
										<el-button size="mini" round>操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
										<el-dropdown-menu slot="dropdown">
											<el-dropdown-item><router-link :to="'/sales/product/create?id='+detailData.id" class="fc-blue"><i class="el-icon-edit"></i> 编辑产品</router-link></el-dropdown-item>
											<el-dropdown-item divided command="del" class="fc-danger"><i class="el-icon-delete"></i> 删除产品</el-dropdown-item>
										</el-dropdown-menu>
									</el-dropdown>
								</p> -->
							</div>
							<div class="info-right">
								<el-form :inline="true" ref="form" label-width="100px">
									<el-row>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="会员名：">{{ detailData.name }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="产品类别："><category-name :data="detailData"></category-name></el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="认证状态："><category-status :data="detailData"></category-status></el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="性别：">{{ detailData.sexName }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="出生年月：">{{ detailData.get_user_info.birthday }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="现居：">{{ detailData.get_user_info.live_province }} - {{ detailData.get_user_info.live_city }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="联系电话：">{{ detailData.phone }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="身高：">{{ detailData.get_user_info.height }}cm</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="籍贯：">{{ detailData.get_user_info.native_province }} - {{ detailData.get_user_info.native_city }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="月薪：">{{ detailData.get_user_info.salaryName }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="注册时间：">{{ detailData.created_at }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="账户状态：">{{ detailData.statusName }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="推荐码：">{{ detailData.get_user_info.recommend_code }}</el-form-item>
										</el-col>
										<el-col :span="24">
											<el-form-item label="会员标签：">
												<el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
													{{tag}}
												</el-tag>
												<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
												<el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
											</el-form-item>
										</el-col>
									</el-row>
								</el-form>
							</div>
						</div>
					</div>
				</div>
			</el-col>

			<el-col :span="24" v-if="detailData.id">
				<div class="dx-container mt20">
					<div class="dx-main p20">
						<el-tabs v-model="showTab" @tab-click="handleClick">
							<el-tab-pane name="children">
								<span slot="label"><i class="el-icon-notebook-2"></i> 认证资料</span>
								<div class="ptools p0 clearfix">
									<div class="f-right">
										<el-button type="primary" @click="infoModifyVisible=true">修改会员资料</el-button>
									</div>
								</div>
								<el-form :inline="true" ref="form" label-width="100px">
									<el-row>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="姓名：">{{ detailData.get_user_info.name }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="性别：">{{ detailData.sexName }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="出生年月：">{{ detailData.get_user_info.birthday }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="婚姻状况：">{{ detailData.get_user_info.marriageName }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="学历：">{{ detailData.get_user_info.educationName }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="月薪：">{{ detailData.get_user_info.salaryName }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="有无车：">{{ detailData.get_user_info.carName }}</el-form-item>
										</el-col>
										<el-col :xs="24" :sm="12" :lg="8">
											<el-form-item label="有无房：">{{ detailData.get_user_info.houseName }}</el-form-item>
										</el-col>
									</el-row>
								</el-form>
							</el-tab-pane>
							<el-tab-pane name="photos">
								<span slot="label"><i class="el-icon-picture-outline"></i> 会员相册</span>
								<div class="photo-item" v-for="(item,index) in detailData.get_photos">
									<el-image style="width: 100px; height: 100px;" :src="item.url" :preview-src-list="[item.url]"></el-image>
									<div class="del" @click="delPhoto(item,index)"><i class="el-icon-error"></i></div>
								</div>
							</el-tab-pane>
							<el-tab-pane name="appointments">
								<span slot="label"><i class="el-icon-tickets"></i> 约会记录</span>
								<el-table v-loading="appointments.listLoading" :data="appointments.data" border style="width: 100%">								
								    <template slot="empty">
								    	<div class="empty-div">
						                    <div><svg-icon icon-class="dx-empty" /></div>
						                    <p>暂无</p>
						                </div>
						            </template>
						        </el-table>
							</el-tab-pane>
						</el-tabs>
					</div>
				</div>
			</el-col>
		</el-row>

		<el-dialog :visible.sync="infoModifyVisible" :title="'修改会员资料'" v-if="infoModifyVisible" width="1100px" @close='infoModifyClose'>
			<el-form :model="formData" ref="form" label-width="100px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="会员类别" prop="category">
							<el-select v-model="formData.category" placeholder="请选择">
								<el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="认证状态" prop="customer_id">
							<el-switch v-model="formData.category_status" :active-value="1" :inactive-value="0" active-text="" inactive-text=""></el-switch>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="姓名" prop="name" style="width:300px;" :rules="[{ required: true, message: '请输入姓名'}]">
							<el-input v-model="formData.name" type="text"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="性别" prop="sex">
							<el-select v-model="formData.sex" placeholder="请选择">
								<el-option v-for="item in sexArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="联系电话" prop="phone" style="width:300px;" :rules="[{ required: true, message: '请输入联系电话'}]">
							<el-input v-model="formData.phone" type="text"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="身高" prop="height" style="width:300px;">
							<el-input v-model="formData.height" type="text"><template slot="append">cm</template></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="出生年月" prop="birthday">
							<el-date-picker v-model="formData.birthday" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="婚姻状况" prop="sex">
							<el-select v-model="formData.marriage" placeholder="请选择">
								<el-option v-for="item in marriageArr" :key="item.value" :label="item.name" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="现居地" prop="live">
							<v-distpicker @selected="selectedLive" :province="detailData.get_user_info.live_province" :city="detailData.get_user_info.live_city" :area="detailData.get_user_info.live_area"></v-distpicker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="籍贯" prop="native">
							<v-distpicker @selected="selectedNative" :province="detailData.get_user_info.native_province" :city="detailData.get_user_info.native_city" hide-area></v-distpicker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="学历" prop="sex">
							<el-select v-model="formData.education" placeholder="请选择">
								<el-option v-for="item in educationArr" :key="item.value" :label="item.name" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="月薪" prop="sex">
							<el-select v-model="formData.salary" placeholder="请选择">
								<el-option v-for="item in salaryArr" :key="item.value" :label="item.name" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="有无车" prop="sex">
							<el-select v-model="formData.car" placeholder="请选择">
								<el-option v-for="item in carArr" :key="item.value" :label="item.name" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="有无房" prop="sex">
							<el-select v-model="formData.house" placeholder="请选择">
								<el-option v-for="item in houseArr" :key="item.value" :label="item.name" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			
			<div slot="footer" class="dialog-footer clearfix">
				<div class="f-left"></div>
				<div class="f-right">
					<el-button @click="close()"><i class="el-icon-close"></i> 关闭</el-button>
					<el-button type="primary" @click="submitForm('form')" :loading="submitLoading"><i class="el-icon-check"></i> 提交</el-button>
				</div>
			</div>
		</el-dialog>

	</div>
</template>

<script>
import { detail, categories, store, photo } from '@/api/user'
import { lists as listsAppointment } from '@/api/appointment'
import {multipleAttributes} from "@/api/base";
import CategoryName from './components/CategoryName'
import CategoryStatus from './components/CategoryStatus'
import VDistpicker from 'v-distpicker'
export default {
	components: { CategoryStatus, CategoryName, VDistpicker },
	data() {
		return {
			detailQuery:{loading:true},
			detailData:{},
			showTab: 'children',
		    appointments:this.listsData(this),
		    infoModifyVisible: false,
		    formData:{},
		    categories: [],
		    sexArr: [{name:'男',id:1},{name:'女',id:2}],
			educationArr: [],
			salaryArr: [],
			marriageArr: [],
			carArr: [{name:'有',value:1},{name:'无',value:0}],
			houseArr: [{name:'无',value:0},{name:'1套',value:1},{name:'2套',value:2},{name:'3套或以上',value:3}],
			dynamicTags: [],
	        inputVisible: false,
	        inputValue: '',
			submitLoading: false
		}
	},
	mounted(){
		this.detailQuery.id = this.$route.query.id;
		this.init();
	},
	methods:{
		init(){
			detail(this.detailQuery).then(res => {
				this.detailData = res.data.data;
				this.formData = {id:this.detailData.id, name:this.detailData.get_user_info.name, category_status:this.detailData.category_status, category:this.detailData.category, sex:this.detailData.sex, birthday:this.detailData.get_user_info.birthday, marriage:this.detailData.get_user_info.marriage, education:this.detailData.get_user_info.education, salary:this.detailData.get_user_info.salary, car:this.detailData.get_user_info.car, house:this.detailData.get_user_info.house, phone:this.detailData.phone, height:this.detailData.get_user_info.height}
				this.dynamicTags = this.detailData.get_user_info.tag.split(',');
			})
			categories({}).then(res => {
				this.categories = res.data.lists;
			})
			multipleAttributes({types:"1,2,3"}).then((res)=>{
				this.educationArr = res.data.data[1];
				this.salaryArr = res.data.data[2];
				this.marriageArr = res.data.data[3];
			})
		},	

		/*标签*/
	    handleClose(tag) {
	        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
	        store({id: this.detailData.id, tag:this.dynamicTags.join(',')}).then(res => {

			})
	    },
        showInput() {
	        this.inputVisible = true;
	        this.$nextTick(_ => {
	        	this.$refs.saveTagInput.$refs.input.focus();
	        });
	    },
		handleInputConfirm() {
			let inputValue = this.inputValue;
			if (inputValue) {
				this.dynamicTags.push(inputValue);
			}
			this.inputVisible = false;
			this.inputValue = '';
			console.log(this.dynamicTags);
			store({id: this.detailData.id, tag:this.dynamicTags.join(',')}).then(res => {

			})
		},
		/*标签*/

		selectedLive(data){
			this.formData.live_province = data.province.value;
			this.formData.live_city = data.city.value;
			this.formData.live_area = data.area.value;
			this.formData.live_code = data.province.code + ',' + data.city.code + ',' + data.area.code;
		},
		selectedNative(data){
			this.formData.native_province = data.province.value;
			this.formData.native_city = data.city.value;
			this.formData.native_code = data.province.code + ',' + data.city.code;
		},

		handleClick(tab, event){
			if(tab.name == 'appointments'){
        		listsAppointment({user_id:this.detailData.id}).then(res => {
					this.appointments = res.data.lists;
				})
        	}
		},
	    goBack(){
	    	this.$router.go(-1);
	    },
	    submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.submitLoading = true;
					store(this.formData).then(res => {
						this.submitLoading = false;
						this.$message.success(res.msg);
						this.detailData = res.data.user;
						this.infoModifyVisible = false;

					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
	    infoModifyClose(){

	    },
	    delPhoto(item,index){
	    	this.$confirm('确认要删除该图片吗？').then(_ => {
            	let postData = {
            		action: 'delete',
		    		user_id: this.detailData.id,
		    		images: item.name
		    	};
		    	photo(postData).then((res)=>{
		    		this.detailData.get_photos.splice(index, 1);
		    	})
        	}).catch(_ => {});
	    	
	    },
	    cancelUpdateStatus(){
	    	store({id: this.detailData.id, update_status:0}).then(res => {
	    		this.detailData.get_user_info.update_status = 0;
			})
	    }
	}
}
</script>

<style>
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .photo-item{float: left;margin-right: 10px;padding: 1px;border: #ddd 1px solid;position: relative;}
  .photo-item .del{position: absolute;top: 5px;right: 5px;color: #f00;}
</style>
