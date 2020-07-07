<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="count-header main-bg mb12">
				<view class="name fs-18 fc-white">我的钱包（元）</view>
				<view class="count-num Arial"><text class="fs-30">￥</text>{{amount}}</view>
				<view @click="goto('/pages/user/wallet/lists/main',1)">
					<dx-button btnBg="transparent" btnBd="#fff" size="mini" round myclass="record fc-white">明细</dx-button>
				</view>
			</view>
			<view class="bg-f mb12">
				<view @click="goto('/pages/user/wallet/recharge/main',1)">
					<dx-list-cell arrow name="充值" iconName="wallet-fill" iconSize="20" iconColor="#3da4ab"></dx-list-cell>
				</view>
				<!-- <view>
					<dx-list-cell arrow name="银行卡" iconName="bankCard-fill" iconSize="20" iconColor="#ff721f"></dx-list-cell>
				</view> -->
				<view>
					<dx-list-cell arrow name="提现" iconName="order1-fill" iconSize="20" iconColor="#79d70f"></dx-list-cell>
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
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				amount: 999.99
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
@import url('index.css')
</style>