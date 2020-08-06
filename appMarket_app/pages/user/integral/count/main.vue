<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="count-header main-bg">
				<view class="name fs-18 fc-white">我的积分</view>
				<view class="count-num Arial">{{data.integral?data.integral : 0}}</view>
				<view @click="goto('/pages/user/integral/lists/main',1)" class="record fs-14 fc-white">明细</view>
			</view>
			<view class="list-group block-sec">
				<dx-list-cell arrow name="积分商城" imgSrc="https://boss.doxinsoft.com/images/app/exchange.png" imgWidth="20" imgHeight="20" imgR="6"
				 @click="goto('/pages/integral/lists/main',1)"></dx-list-cell>
				<dx-list-cell arrow name="我的订单" imgSrc="https://boss.doxinsoft.com/images/app/orderlist.png" imgWidth="20" imgHeight="20" imgR="6"
				 @click="goto('/pages/user/integral/order/lists/main?status=3&historyUrl=del',1)"></dx-list-cell>
			</view>

		</view>
	</view>
</template>

<script>
	import dxListCell from "doxinui/components/list-cell/list-cell"
	export default {
		components:{
			dxListCell
		},
		data() {
			return {
				formAction: '/shop/user',
				mpType: 'page', //用来分清父和子组件
				// data: this.formatData(this),
				getSiteName: this.getSiteName(),
				data:{
					integral: 25000,
				}
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
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style scoped="">
@import url('index.css');
</style>