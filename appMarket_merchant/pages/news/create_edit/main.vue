<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.title" placeholder="请输入文章标题" type="text" name="title" datatype="require" maxlength="50"></weui-input>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.content" placeholder="请输入文章内容" type="textarea" name="content" datatype="require"></weui-input>
			</view>
			<view class="m20" @click="submit">
				<dx-button size="lg" type="success" block>保存</dx-button>
			</view>
		</view>
	</view>
</template>

<script>
import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{
			dxftButton
		},
		data() {
			return {
				formAction: '',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				vaildate:{},
				id:0,
			}
		},
		methods: {
			submit(){
				if(!this.ruleform.auto_group){
					delete this.vaildate.group_num;
					delete this.vaildate.group_price;
				}
				if(!this.ruleform.auto_putaway){
					delete this.vaildate.auto_putaway;
				
				}
				console.log(this.vaildate);
				
				this.vaildForm(this,res=>{
					if(res){
						this.postAjax(this.formAction,this.ruleform).then(msg=>{
							if(msg.data.status == 2){
								this.back();
							}
						});
					}
				});
			},
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					if(msg.detail){
						this.ruleform = msg.detail;
						if(this.ruleform.cover) this.ruleform.cover = this.ruleform.cover.split(",");
						console.log(this.ruleform);
					}
					
				});
			}
		},
		onLoad(options) {
			if(options.id){
				this.formAction = "/merchant/article/edit?id="+ options.id;
				this.ajax();
			}else{
				this.formAction = "/merchant/article/create";
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		
	}
</script>
<style scoped="">
@import url('index.css')
</style>