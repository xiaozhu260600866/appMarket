<template>
	<view>
		<view class="bg-white"></view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="info-form zindex2">
			<view class="bg-f">
				<weui-input v-model="ruleform.phone" label="手机号" type="number" name="phone" datatype="require|phone" ></weui-input>
				<weui-input v-model="ruleform.code" label="验证码" datatype="require" type="sms" name="sms" :phone="ruleform.phone" action="/sendSms.html"></weui-input>
				<weui-input v-model="ruleform.loginPassword" label="密码" type="password" name="loginPassword"></weui-input>
			</view>
			<view class="m20 info-subBtn"><dx-button size="lg" block @click="submit"> 完成</dx-button></view>
			<view class="text-center fs-15 fc-3 mt30" @click="goto('/pages/user/login/main')">立即登录</view>
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
						this.ruleform.role = 2;
						this.postAjax("/user/password",this.ruleform).then(msg=>{
							if(msg.data.status == 2){
								this.goto("/pages/user/login/main");
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