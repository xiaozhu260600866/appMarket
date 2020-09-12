<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class=" bg-f" v-if="data.show">
			<view class="recharge p10 bg-f mb12">
				<view class="fs-14 fc-9 mb5">可提现金额<text class="Arial pl5">{{ data.price }}</text>元</view>
				<view class="recharge-box">
					<view class="box-label">提现金额</view>
					<weui-input v-model="ruleform.amount" myclass="input" placeholder="请输入提现金额" type="text" name="amount" datatype="require|price"></weui-input>
				</view>
			</view>
			<view class="fs-14 m10 mt20">选择提现渠道</view>
			<weui-input v-model="ruleform.blank_client_name" label="姓名" placeholder="请输入姓名" type="text" name="blank_client_name" datatype="require"></weui-input>
			<weui-input v-model="ruleform.blank_name" name="blank_name" label="选择银行" changeField="value" type="select" :dataKey="'bankTypeArr'" datatype="require"></weui-input>
			<weui-input v-model="ruleform.blank_cardno" label="银行卡号" placeholder="请输入银行卡号" type="text" name="blank_cardno" datatype="require"></weui-input>
			<view class="m20">
				<dx-button type="primary" btnBg="#57C734" btnBd="#57C734" block @click="submit">提现</dx-button>
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
				amount:999.99,
				bankTypeArr: [{
						label: '工商银行',
						value: '工商银行'
					},
					{
						label: '中国银行',
						value: '中国银行'
					},
				],
				ruleform:{},
				vaildate:{}
			}
		},
		methods: {
			submit(){
				this.vaildForm(this,res=>{
					if(res){
						this.postAjax("/deliver/wallet",this.ruleform).then(msg=>{
								if(msg.data.status  == 2){
									this.ajax();
								}
						});
					}
				});
			},
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
@import url('./index.css')
</style>