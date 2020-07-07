<template>
	<div>
		<el-upload :action="url" :file-list="fileList" list-type="picture-card" :data="uploadData" :limit="length" :on-success="handelSuccess" :on-preview="handlePreview" :on-remove="handleRemove" :class="{disabled:uploadDisabled}">
			<span v-if="!defaultText"><i class="el-icon-plus"></i></span>
			<span v-if="defaultText">{{ defaultText }}</span>
		</el-upload>
		<el-dialog :visible.sync="dialogImageVisible"><img width="100%" :src="dialogImageUrl" alt=""></el-dialog>
	</div>
</template>

<script>
import { uploadDelete } from '@/api/base'
export default {
	props: {
		pathName:{
			type:String
		},
		length:{
			type:Number
		},
		fileList:{
			type:Array,
			default:() => []
		},
		thumbsize:{
			type:Array,
			default:() => []
		},
		defaultText:{
			type:String,
			default:''
		}
	},
	data() {
		return {
			url:process.env.VUE_APP_BASE_API+'/base/upload',
			uploadData: {
				client_id:this.$store.getters.client_id,
				type:"image",
				pathname: this.pathName,
				thumbsize: this.thumbsize,
				token: this.$store.getters.token,
				respone: 'filename'
			},
			uploadPic:"",
			dialogImageUrl: '',
			dialogImageVisible: false
		}
	},
	watch:{
		fileList(row){
			
			console.log(this.fileList)
			if(this.length == 1 && this.fileList.length >0){
				this.uploadPic = this.fileList[0].url;
			}
			if(this.length == 1 && this.fileList.length == 0){
				this.uploadPic = "";
			}
			
		}
	},
	computed: {
   
	    uploadDisabled:function() {
	        return this.length==1?this.fileList.length > 0:false;
	    },
	  
	},
	mounted(){
		
		if(this.length == 1 && this.fileList.length >0){
			this.uploadPic = this.fileList[0].url;
		}
		
	},
	methods:{
		handelSuccess(response, file){
			//console.log(response, file)
			if(this.length == 1){
				this.fileList.splice(0, 1);


			}

			this.fileList.push(file);

			this.$emit('callBack', file);
		},
		handlePreview(file) {
	        this.dialogImageUrl = file.url;
	        this.dialogImageVisible = true;
	    },
		handleRemove(file, fileList) {
	        for (var i = 0; i < this.fileList.length; i++) {
				if (this.fileList[i].uid == file.uid) this.fileList.splice(i, 1);
			}
			uploadDelete({file:file.response,pathname:this.pathName,thumbsize:this.thumbsize}).then(res => {
				console.log(res);
			})
	    },
	}
}
</script>

<style>
.disabled .el-upload--picture-card {
    display: none;
}
</style>