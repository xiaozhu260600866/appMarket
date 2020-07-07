<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="recharge p10 bg-f">
				<view class="weui-cell plr15">
					<view class="weui-cell__hd"><label class="weui-label fc-6 fs-16">充值金额</label></view>
					<view class="weui-cell__bd">
						<input type="number" class="recharge-input fs-18" name="" placeholder="0" placeholder-style="color:#FE4543" v-model="ruleform.amount">
					</view>
				</view>
			</view>
			<view class="fs-15 fc-3 plr10 pt15 pb5 mt12 bg-f flex-between">
				<view>请选择充值金额</view>
				<view @click="goto('/pages/news/show/main',1)">充值协议<text class="dxi-icon dxi-icon-right fs-13 fc-a pl5"></text></view>
			</view>
			<view class="rechage-price p5 bg-f">
				<view :class="['selectAmount',ruleform.amount == v  ? 'select' :'noselect' ]" v-for="v in amountData">
					<view :class="['num',ruleform.amount == v ? 'fc-white': '']" @click="changePrice(v)">{{ v }}<text class="fs-14" v-if="v !='其他'">元</text></view>
				</view>
				<view :class="['selectAmount',ruleform.amount != 100 && ruleform.amount !=200 && ruleform.amount !=300 && ruleform.amount !=500 && ruleform.amount !=1000 ? 'select' :'noselect' ]">
					<view class="num" @click="changePrice(0)">其他</view>
				</view>
			</view>
			<view class="bg-f text-center fs-14 fc-6 p10">
				<view>充200送10、充500送100、充1000送200</view>
			</view>
			<view class="fs-14 m10 mt20">选择方式</view>
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
				<dx-button type="primary" btnBg="#57C734" btnBd="#57C734" block>充值</dx-button>
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
				ruleform:{
					amount: 100,
					radio: ''
				},
				amountData: [100, 200, 300, 500, 1000],
				sendTypeArr: [{
					label: '微信支付',
					value: '1',
				},{
					label: '支付宝支付',
					value: '2',
				}],
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