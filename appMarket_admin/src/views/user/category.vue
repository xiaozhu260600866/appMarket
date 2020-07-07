<template>
	<div class="app-container">
		<el-row>
			<el-col :span="24">
				<div class="dx-container">
					<tyt-page-header content="会员等级管理"></tyt-page-header>
					<div class="dx-main">
						<div class="ptools">
							<!-- <div class="text-right mt0"><el-button type="primary" @click="handelCreate()"><i class="el-icon-plus"></i> 新增</el-button></div> -->
						</div>
						<div class="list-box">
							
							<el-table :data="listsData.lists" border style="width: 100%" @selection-change="selsChange" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
								<el-table-column type="selection" align="center" width="55"></el-table-column>
								<el-table-column prop="name" label="名称"></el-table-column>
								<el-table-column label="价格（男/女）">
									<template slot-scope="scope">
										{{ scope.row.price_male }} / {{ scope.row.price_female }}
									</template>
								</el-table-column>
								<el-table-column label="见面费（男/女）">
									<template slot-scope="scope">
										{{ scope.row.meet_price_male }} / {{ scope.row.meet_price_female }}
									</template>
								</el-table-column>
								<el-table-column prop="meet_num_name" label="见面次数" align="center" width="100"></el-table-column>
								<el-table-column label="状态" align="center" width="100">
									<template slot-scope="scope">
										<el-switch v-model="scope.row.status" @change="changeStatus(scope.row)" :active-value="1" :inactive-value="0" active-text="" inactive-text=""></el-switch>
									</template>
								</el-table-column>
								<el-table-column prop="sort" label="排序" align="center" width="80"></el-table-column>
								<el-table-column label="操作" align="right" width="200">
									<template slot-scope="scope">
										<el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i> 编辑</el-button>
										<!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i> 删除</el-button> -->
									</template>
								</el-table-column>
								</el-table-column>
							</el-table>
							<!-- <div class="list-bottom clearfix">
								<div class="f-left"><el-button type="danger" @click="selectDelete" :disabled="this.selectLists.length===0"><i class="el-icon-delete-solid"></i> 批量删除</el-button></div>
								<div class="f-right">
								</div>
							</div> -->

							<el-dialog :visible.sync="formVisible" :title="formTitle" v-if="formVisible" width="700px">
								<el-form :model="formData" ref="form" label-width="120px">
									<el-row>
										<el-col :span="24">
											<el-form-item label="名称" prop="name" :rules="[{ required: true, message: '请输入名称'}]">
												<el-input v-model="formData.name"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="现价（男）" prop="price_male" :rules="[{ required: true, message: '请输入现价'}]">
												<el-input v-model="formData.price_male"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="原价（男）" prop="price_male_original">
												<el-input v-model="formData.price_male_original"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="现价（女）" prop="price_female" :rules="[{ required: true, message: '请输入现价'}]">
												<el-input v-model="formData.price_female"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="原价（女）" prop="price_female_original">
												<el-input v-model="formData.price_female_original"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="见面费（男）" prop="meet_price_male" :rules="[{ required: true, message: '请输入见面费'}]">
												<el-input v-model="formData.meet_price_male"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="见面费（女）" prop="meet_price_female" :rules="[{ required: true, message: '请输入见面费'}]">
												<el-input v-model="formData.meet_price_female"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="见面次数" prop="meet_num">
												<el-input v-model="formData.meet_num" type="number" placeholder="输入0表示不限制"></el-input>
											</el-form-item>
										</el-col>
										<!-- <el-col :span="12">
											<el-form-item label="排序" prop="sort">
												<el-input v-model="formData.sort" type="number" placeholder="0"></el-input>
											</el-form-item>
										</el-col> -->
										<el-col :span="12">
											<el-form-item label="状态" prop="status">
												<el-switch v-model="formData.status" :active-value="1" :inactive-value="0"></el-switch>
											</el-form-item>
										</el-col>
									</el-row>
								</el-form>
								<div slot="footer" class="dialog-footer">
									<el-button @click="formVisible=false">取 消</el-button>
									<el-button type="primary" @click="submitForm('form')">确 定</el-button>
								</div>
							</el-dialog>
							
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { categories, categoryStore, categoryDelete } from '@/api/user'
export default {
	data() {
		return {
			formVisible:false,
			formData:{},
			selectLists:[],
			listsData:this.listsData(this)
		}
	},
	mounted(){
		this.getData();
	},
	methods:{
		getData(){
			categories({}).then(res => {
				this.listsData = res.data
			})
		},
		selsChange: function(sels) {
			this.selectLists = sels;
		},
		handelCreate(){
			this.formTitle = '新增'
			this.formVisible = true;
			this.formData={id:'',price_male_original:'',price_male:'',price_female_original:'',price_female:'',meet_price_male:'',meet_price_female:'',meet_num:'',name:'',sort:'',status:1}
		},
		handleEdit(index,row){
			this.formData.id = row.id
			this.$set(this.formData,"name",row.name)
			this.$set(this.formData,"sort",row.sort)
			this.$set(this.formData,"price_male",row.price_male)
			this.$set(this.formData,"price_male_original",row.price_male_original)
			this.$set(this.formData,"price_female",row.price_female)
			this.$set(this.formData,"price_female_original",row.price_female_original)
			this.$set(this.formData,"meet_price_male",row.meet_price_male)
			this.$set(this.formData,"meet_price_female",row.meet_price_female)
			this.$set(this.formData,"meet_num",row.meet_num)
			this.$set(this.formData,"status",row.status)
			this.formTitle = '修改'
			this.formVisible = true;
		},
		handleDelete(index,row){
			this.tytConfirm({msg:'确认要删除该行数据吗？'},this).then(obj=>{
    			categoryDelete({id:row.id}).then(res => {
    				obj.instance.confirmButtonLoading = false;
					this.msgSuccess(res.msg,this);
					this.listsData.lists.splice(index, 1);
					obj.done();
				})
				
	    	}).catch(obj => {obj.instance.confirmButtonLoading = false;obj.done()});
		},
		selectDelete(){
			this.tytConfirm({msg:'确认要删除所选行数据吗？'},this).then(obj=>{
	            categoryDelete({id:this.selectLists2IdStr(this.selectLists)}).then(res => {
    				obj.instance.confirmButtonLoading = false;
					this.msgSuccess(res.msg,this);
					this.getData();
					obj.done();
				})
	        }).catch(obj => {obj.instance.confirmButtonLoading = false;obj.done()});
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					categoryStore(this.formData).then(res => {
						this.msgSuccess(res.msg,this);
						this.getData();
						this.formVisible = false;
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		close(){
			
		}
	}
}
</script>

<style>
</style>
