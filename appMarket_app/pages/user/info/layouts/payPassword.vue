<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="payP-box">
			<view class="fs-14 fc-3 lh-20 mb10">请输入新的支付密码</view>
			<view class="num-group">
				<input type="passwrod" />
				<input type="passwrod" />
				<input type="passwrod" />
				<input type="passwrod" />
				<input type="passwrod" />
				<input type="passwrod" />
			</view>
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