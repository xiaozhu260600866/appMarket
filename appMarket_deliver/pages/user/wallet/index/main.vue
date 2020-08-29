<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="count-header main-bg mb12 pb20">
				<view class="group">
					<view class="name fs-15 fc-white">总收入(元)</view>
					<view class="count-num Arial">{{data.inSum}}</view>
				</view>
				<view class="flex mt40">
					<view class="group flex1">
						<view class="name fs-15 fc-white">今日成交数(笔)</view>
						<view class="count-num Arial">{{data.toDayInCount}}</view>
					</view>
					<view class="group flex1">
						<view class="name fs-15 fc-white">今日收益(元)</view>
						<view class="count-num Arial">{{data.toDayInSum}}</view>
					</view>
				</view>
			</view>
			<view class="bg-f mb12">
				<view @click="goto('/pages/user/wallet/lists/income',1)">
					<dx-list-cell arrow name="收入明细" iconName="order1-fill" iconSize="20" iconColor="#3da4ab"></dx-list-cell>
				</view>
				<view @click="goto('/pages/user/wallet/withdraw/main',1)">
					<dx-list-cell arrow name="提现" iconName="wallet-fill" iconSize="20" iconColor="#ff721f">
						<view slot="right" class="fs-15 fc-3">
							可提现余额：<text class="Arial">{{ data.price }}</text>元
						</view>
					</dx-list-cell>
				</view>
				<view @click="goto('/pages/user/wallet/lists/withdraw',1)">
					<dx-list-cell arrow name="提现明细" iconName="order2-fill" iconSize="20" iconColor="#79d70f"></dx-list-cell>
				</view>
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
				formAction: '/deliver/index',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				amount: 999.99,
				order_num: 12,
				order_price: 156.36,
				count: 126.00
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