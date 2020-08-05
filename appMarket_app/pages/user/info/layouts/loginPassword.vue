<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="info-form">
			<view class="bg-f">
			<weui-input v-model="ruleform.phone" label="手机号" type="number" name="phone" datatype="require|phone" ></weui-input>
			<weui-input v-model="ruleform.code" label="验证码" datatype="require" type="sms" name="sms" :phone="ruleform.phone" action="/sendSms.html"></weui-input>
			<weui-input v-model="ruleform.password" label="密码" type="password" name="password" datatype="require"></weui-input>
			</view>
			<view class="m20 info-subBtn" @click="submit"><dx-button block>完成</dx-button></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				vaildate:{}
			}
		},
		methods: {
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					
				});
			},
			submit(){
				
				this.vaildForm(this,res=>{
					if(res){
						if (this.ruleform.code != wx.getStorageSync('smsCode')) {
							this.getError("验证码不正确");
							return false;
						}
						this.postAjax("/user/info",this.ruleform).then(msg=>{
							if(msg.data.status == 2){
								this.back();
							}
						});
					}
				});
				
			},
		},
		onLoad(options) {
			//this.ajax();
			
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