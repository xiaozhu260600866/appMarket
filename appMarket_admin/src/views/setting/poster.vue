<template>
	<div class="app-container">
		<el-row>
			<el-col :span="24">
				<div class="dx-container">
					<tyt-page-header content="基础资料"></tyt-page-header>
					<div class="dx-main">
						<div class="list-box">
							<el-tabs v-model="tabActive" @tab-click="handleClick">
							    <el-tab-pane :label="item.name" :name="item.remark" v-for="(item, index) in tabs">
							    	<poster-lists :type="item"></poster-lists>
							    </el-tab-pane>
							</el-tabs>
							
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { types } from '@/api/poster'
import PosterLists from '@/views/components/PosterLists'
export default {
	components: { PosterLists },
	data() {
		return {
			tabs:[],
			tabActive:'index_slider',
			type:'',
		}
	},
	mounted(){
		this.getData();
	},
	methods:{
		handleClick(tab, event) {
	        console.log(tab, event);
	    },
		getData(){
			types({}).then(res => {
				this.tabs = res.data.lists;
				if(!this.tabActive) this.tabActive = this.tabs[0].name
			})
		},
		changeStatus(row){
			//console.log(row)
			const data = {id:row.id,status:row.status};
			classStore(data).then(res => {
				this.$message.success(res.msg);
				console.log(res)
				//this.listsData = res.data.lists
			})
		},
		handleEdit(index,row){
			console.log(row)
			this.formData.id = row.id
			this.formData.fid = row.fid
			//this.formData.name = row.name
			this.$set(this.formData,"name",row.name)
			this.$set(this.formData,"sort",row.sort)
			this.$set(this.formData,"status",row.status)
			this.formTitle = '修改分类'
			this.formVisible = true;
		},
		handleDelete(index,row){
			let confirmTxt = row.children?'该分类下有子分类，删除该分类将会把该分类下的子分类一并删除，确认要删除吗？':'确认要删除该分类吗？'
			this.$confirm(confirmTxt).then(res => {
	            classDelete({id:row.id}).then(res => {
					this.$message.success(res.msg);
					this.getData();
					//this.listsData.splice(index, 1);
				})
	        }).catch(res => {});
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					classStore(this.formData).then(res => {
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
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	}
}
</script>

<style>
</style>
