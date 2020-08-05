<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="info-form">
			<view>
				<view class="bg-f">
					<weui-input v-model="ruleform.phone" label="手机号" type="number" name="phone" datatype="require|phone" ></weui-input>
					<weui-input v-model="ruleform.code" label="验证码" datatype="require" type="sms" name="sms" :phone="ruleform.phone" action="/sendSms.html"></weui-input>
				</view>
				<view class="m20 info-subBtn" @click="next"><dx-button block>下一步</dx-button></view>
			</view>
			<ssPaymentPassword ref="paymentPassword" :mode="mode" @submit="submitHandle" />
		</view>
	</view>
</template>

<script>
	import ssPaymentPassword from '@/components/sanshui-payment-password'
	export default {
		components:{
			ssPaymentPassword
		},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				step:1,
				mode:0,
				password:[],
				getSiteName: this.getSiteName(),
				ruleform:{},
				focus:true,
				vaildate:{}
			}
		},
		methods: {
			submitHandle(e){
				this.ruleform.pay_password = e.value;
				this.postAjax("/user/info",this.ruleform).then(msg=>{
					if(msg.data.status == 2){
						this.back();
					}
				});
			},
			next(){
				this.vaildForm(this,res=>{
					if(res){
						if (this.ruleform.code != wx.getStorageSync('smsCode')) {
							this.getError("验证码不正确");
							return false;
						}
						this.step =2;
						this.$refs.paymentPassword.modalFun('show');
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