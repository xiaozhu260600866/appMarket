<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="info-form">
			<view class="bg-f">
				<weui-input v-model="ruleform.nickname" label="昵称" placeholder="不超过10个字" datatype="require" type="text" name="nickname" maxlength="10"></weui-input>
			</view>
			<view class="m20 info-subBtn"><dx-button block @click="submit">确定</dx-button></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				vaildate:{},
			}
		},
		methods: {
			submit(){
				this.vaildForm(this,res=>{
					if(res){
						this.postAjax("/user/info",this.ruleform).then(msg=>{
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
					this.ruleform = msg.user;
				});
			}
		},
		onLoad(options) {
			this.ajax();
			
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
@import url('../index.css')
</style>