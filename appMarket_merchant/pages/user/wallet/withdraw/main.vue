<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="recharge p10 bg-f">
				<view class="weui-cell plr15">
					<view class="weui-cell__hd"><label class="weui-label fc-6 fs-16">提现金额</label></view>
					<view class="weui-cell__bd">
						<input type="number" class="recharge-input fs-18" name="" placeholder="0" placeholder-style="color:#FE4543">
					</view>
				</view>
				<view class="fs-14 fc-9 mt10">可提现金额<text class="Arial pl5">{{ amount }}</text>元</view>
			</view>
			<view class="fs-14 m10 mt20">选择提现渠道</view>
			<view class="bg-f">
				<dx-list-cell name="微信支付" iconName="wechat" iconSize="20" iconColor="#4CB202" :slotLeft="true">
					<view slot="left" class="mr15 reRadio">
						<radio class="flex"></radio>
					</view>
				</dx-list-cell>
				<dx-list-cell name="支付宝支付" iconName="alipay-fill" iconSize="20" iconColor="#1296DB" :slotLeft="true">
					<view slot="left" class="mr15 reRadio">
						<radio class="flex"></radio>
					</view>
				</dx-list-cell>
			</view>
			<view class="m20">
				<dx-button type="primary" btnBg="#57C734" btnBd="#57C734" block>提现</dx-button>
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
				amount:999.99
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
@import url('./index.css')
</style>