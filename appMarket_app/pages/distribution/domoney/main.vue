<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<section v-if="data.show">
			<div class="con-money p15 pb0 bg-f mb8">
				<p class="fs-16 fc-6 pb15">提现金额<text class="Aritl">(￥{{data.price}})</text></p>
				<div class="m-input flex lh-30 pb15">
					<span class="fs-20 pr5">￥</span>
					<weui-input v-model="ruleform.amount" myclass="input fs-20 w-b100 p0 bd-0" placeholder="请输入提现金额" type="text" name="amount"></weui-input>
				</div>
			</div>
			<div class="do-mode mb8 bg-f">
				<div class="pay-type">
					<weui-input v-model="ruleform.payType" name="payType" :radioType="true" label="提现方式" changeField="value" type="radio"
					 :dataKey="'payTypeArr'"></weui-input>
				</div>
				<div class="bankcard plr15" v-if="ruleform.payType == 2 ">
					<weui-input v-model="ruleform.blank_client_name" label="姓名" placeholder="请输入姓名" type="text" name="blank_client_name"></weui-input>
					<weui-input v-model="ruleform.blank_name" name="blank_name" label="选择银行" changeField="value" type="select" :dataKey="'bankTypeArr'"></weui-input>
					<weui-input v-model="ruleform.blank_cardno" label="银行卡号" placeholder="请输入银行卡号" type="text" name="blank_cardno"></weui-input>
					<!-- <weui-input v-model="ruleform.name" label="确认卡号" placeholder="请确认银行卡号" type="text" name="name"></weui-input> -->
				</div>
			</div>
			<div class="m20">
				<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="formSubmit" myclass="dx-btn dx-btn-big dx-btn-green bdr6 w-b100"></myform>
			</div>
		</section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/shop/dis/do-money',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				thisDiag: false,
				ruleform: {
					amount: '',
					name: '',
					payType: 1,
					blank_name: '工商银行'
				},
				price: 0,
				vaildate: { /*验证规则，目前支前有，require|phone|integer|price*/
					amount: {
						name: '金额',
						vaild: 'require|price'
					}
				},
				payTypeArr: [{
						label: '提现到微信钱包',
						value: 1,
						icon: 'iconfont icon-pay-wechat'
					},
					//{label:'支付宝',value:'支付宝',icon:'iconfont icon-pay-alipay'},
					// {
					// 	label: '提现到银行卡',
					// 	value: 2,
					// 	icon: 'iconfont icon-pay-bankcard'
					// },
				],
				bankTypeArr: [{
						label: '工商银行',
						value: '工商银行'
					},
					{
						label: '中国银行',
						value: '中国银行'
					},
				],
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
			},
			submit() {
				this.toggleDiag();
			},
			formSubmit(e) {
				this.postAjax(this.formAction, this.ruleform).then(msg=>{
					if (msg.data.status == 2) {
						setTimeout(() => {
							this.goto("/pages/shop/distribution/record-list/index");
						}, 1000)
					
					}
				});
			},
		}
	}
</script>
<style scoped="">
	@import url("./index.css");
</style>