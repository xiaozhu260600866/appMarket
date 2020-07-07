<template>
	<div>
		<p align="right" class="mt0"><el-button type="primary" @click="handelCreate()"><i class="el-icon-plus"></i> 新增</el-button></p>
		<el-table :data="listsData.lists" border style="width: 100%" @selection-change="selsChange" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
			<el-table-column type="selection" align="center" width="55"></el-table-column>
			<el-table-column prop="name" label="名称"></el-table-column>
			<el-table-column label="状态" align="center" width="100">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.status" @change="changeStatus(scope.row)" :active-value="1" :inactive-value="0" active-text="" inactive-text=""></el-switch>
				</template>
			</el-table-column>
			<el-table-column prop="sort" label="排序" align="center" width="80"></el-table-column>
			<el-table-column label="操作" align="right" width="200">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i> 编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i> 删除</el-button>
				</template>
			</el-table-column>
			</el-table-column>
		</el-table>
		<div class="list-bottom clearfix">
			<div class="f-left"><el-button type="danger" @click="selectDelete" :disabled="this.selectLists.length===0"><i class="el-icon-delete-solid"></i> 批量删除</el-button></div>
			<div class="f-right">
			</div>
		</div>

		<el-dialog :visible.sync="formVisible" :title="formTitle" v-if="formVisible" width="700px">
			<el-form :model="formData" ref="form" label-width="100px">
				<el-row>
					<el-col :span="24">
						<el-form-item label="上级" prop="fid" v-if="type.level>1">
							<el-select v-model="formData.fid" clearable placeholder="不选择则为一级">
							    <el-option v-for="item in listsData.lists" :key="item.value" :label="item.name" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24" v-if="type.text_type==2">
						<el-form-item label="内容" prop="name" :rules="[{ required: true, message: '内容不能为空'},]">
							<el-input type="textarea" row="4" v-model="formData.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12" v-else>
						<el-form-item label="名称" prop="name" :rules="[{ required: true, message: '名称不能为空'},]">
							<el-input v-model="formData.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="排序" prop="sort">
							<el-input v-model="formData.sort" type="number" placeholder="0"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="默认" prop="sort">
							<el-switch v-model="formData.def" :active-value="1" :inactive-value="0"></el-switch>
						</el-form-item>
					</el-col>
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
</template>

<script>
import { attributes,attributeStore,attributeDelete } from '@/api/base'
export default {
	props: {
		type:{
			type:Object,
			default:{}
		}
	},
	data() {
		return {
			formVisible:false,
			formTitle:'',
			formData:{},
			selectLists:[],
			listsData:this.listsData(this)
		}
	},
	watch:{
		type(val){
			this.formData.type = val.id;
		}
	},
	mounted(){
		this.getData();
	},
	methods:{
		getData(){
			attributes({type:this.type.id}).then(res => {
				this.listsData = res.data
				console.log(this.listsData)
			})
		},
		selsChange: function(sels) {
			this.selectLists = sels;
		},
		handelCreate(){
			this.formTitle = '新增'
			this.formVisible = true;
			this.formData={id:'',type:this.type.id,fid:'',name:'',sort:'',def:0,status:1}
		},
		handleEdit(index,row){
			this.formData.id = row.id
			this.$set(this.formData,"fid",row.fid)
			this.$set(this.formData,"name",row.name)
			this.$set(this.formData,"sort",row.sort)
			this.$set(this.formData,"def",row.def)
			this.$set(this.formData,"status",row.status)
			this.formTitle = '修改'
			this.formVisible = true;
		},
		handleDelete(index,row){
			this.tytConfirm({msg:'确认要删除该行数据吗？'},this).then(obj=>{
    			attributeDelete({id:row.id}).then(res => {
    				obj.instance.confirmButtonLoading = false;
					this.$message.success(res.msg);
					this.listsData.lists.splice(index, 1);
					obj.done();
				})
				
	    	}).catch(obj => {obj.instance.confirmButtonLoading = false;obj.done()});
		},
		selectDelete(){
			this.tytConfirm({msg:'确认要删除所选行数据吗？'},this).then(obj=>{
	            attributeDelete({id:this.selectLists2IdStr(this.selectLists)}).then(res => {
    				obj.instance.confirmButtonLoading = false;
					this.$message.success(res.msg);
					this.getData();
					obj.done();
				})
	        }).catch(obj => {obj.instance.confirmButtonLoading = false;obj.done()});
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					attributeStore(this.formData).then(res => {
						this.$message.success(res.msg);
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
			this.$emit('close');
		}
	}
}
</script>