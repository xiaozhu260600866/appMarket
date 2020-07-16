<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="payed-content">
			<view class="con" v-if="detail.payed_at">
				<view class="p"><dx-icon name="success" size="70" color="#09BB07"></dx-icon></view>
				<view class="p content">支付成功</view>
			</view>
			<view class="con" v-if="!detail.payed_at">
				<view class="p"><dx-icon name="fail" size="70" color="#E84335"></dx-icon></view>
				<view class="p content">支付失败</view>
			</view>
			<view class="button" @click="goto('/pages/index/main',2)">
				<dx-button :type="detail.payed_at?'success':'danger'" size="lg" block>返回</dx-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/order/ready-pay',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				order_no: '',
				detail:{
				
				},
				getSiteName: this.getSiteName(),
			}
		},
		methods: {
			ajax() {
				this.getAjaxForApp(this, {order_no:this.order_no
				
				}).then(msg => {
					this.detail = msg.detail; 
				});
			}
		},
		onLoad(options) {
			this.order_no = options.order_no;
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
@import url('index.css')
</style>