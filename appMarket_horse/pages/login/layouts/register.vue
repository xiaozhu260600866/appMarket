<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="info-form">
			<view class="bg-f">
				<weui-input v-model="ruleform.sms" label="手机号" type="sms" name="sms" :phone="ruleform.phone" action="/auth/sendSms"></weui-input>
				<weui-input v-model="ruleform.loginPassword" label="密码" type="number" name="loginPassword"></weui-input>
				<weui-input v-model="ruleform.invitation_code" label="邀请码" type="number" name="invitation_code"></weui-input>
			</view>
			<view class="agreement mlr20 mt15 flex-middle fs-13 fc-6">
				<checkbox-group><checkbox /></checkbox-group>
				<view>我已阅读并同意</view>
				<view class="main-color" @click="goto('/pages/news/show/main',1)">《用户协议》</view>
			</view>
			<view class="m20 info-subBtn"><dx-button block>完成</dx-button></view>
			<view class="text-center fs-13 fc-9 mt30" @click="goto('/pages/login/main')">立即登录</view>
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
				ruleform:{}
			}
		},
		methods: {
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					
				});
			}
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