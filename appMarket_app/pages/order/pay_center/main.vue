<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="order_no">订单编号<span>{{ruleform.order_no}}</span></view>
			<view id="pay_price"><span class="fs-20">￥</span>{{ ruleform.amount }}</view>
			<!-- <view class="fs-15 fc-6 text-center">支付剩余<text class="Arial">14</text>分<text class="Arial">32</text>秒</view> -->
			<view class="payRadio bg-f mlr20 plr5 bdr6">
				<view class="fs-16 p15 pb0">支付方式</view>
				<weui-input v-model="ruleform.pay_method" name="radio" changeField="value" type="radio" dataKey="payArr" @callback="test"
				 :row="true" Labelleft>
					<view slot="icon_0">
						<view class="dxi-icon dxi-icon-wechat ml15 mr10 fs-20" style="color:#4CB202;"></view>
					</view>
					<view slot="icon_1">
						<view class="dxi-icon dxi-icon-alipay-fill ml15 mr10 fs-20" style="color:#1296DB;"></view>
					</view>
					<view slot="icon_2">
						<view class="dxi-icon dxi-icon-bankCard-fill ml15 mr10 fs-20" style="color:#ff721f;"></view>
					</view>
				</weui-input>
			</view>
			<view class="m20">
				<dx-button type="success" icon="icon-time-o" size="lg" block @click="submit">立即支付</dx-button>
			</view>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/order/ready-pay',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				order_no: '',
				ruleform: {},
				vaildate: {},
				returnUrl: '',
				config: {},
				payArr: [{
						label: '微信支付',
						value: 1,

					}, {
						label: '支付宝支付',
						value: 3,
					},
					{
						label: '余额支付',
						value: 2,
					}

				],
			}
		},
		methods: {
			wxPay() {
				let orderInfo = this.config
				console.log(orderInfo);
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: orderInfo, //微信、支付宝订单数据
					success: res => {
						this.goto("/pages/order/payed/main?order_no="+this.ruleform.order_no);
						console.log('success:' + JSON.stringify(res));
					},
					fail: err => {
						this.getError("支付失败");
						console.log('fail:' + JSON.stringify(err));
					}
				});

			},
			submit() {
				this.postAjax(this.formAction, this.ruleform).then(msg => {
					if (msg.data.status == 2) {
						this.config = msg.data.config;
						this.wxPay();
					}
				});
			},
			ajax() {
				this.getAjaxForApp(this, {
					order_no: this.order_no

				}).then(msg => {
					this.ruleform = msg.detail;
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
<style scoped>
	@import url('index.css')
</style>
