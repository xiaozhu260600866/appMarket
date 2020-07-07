<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="info-form">
			<view class="bg-f">
				<weui-input v-model="ruleform.sms" label="手机号" type="sms" name="sms" :phone="ruleform.phone" action="/auth/sendSms"></weui-input>
				<weui-input v-model="ruleform.loginPassword" label="密码" type="number" name="loginPassword"></weui-input>
			</view>
			<view class="m20 info-subBtn"><dx-button block>完成</dx-button></view>
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