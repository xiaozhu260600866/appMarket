<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="info-form">
			<view class="bg-f mb12">
				<view @click="goto('/pages/user/setting/layouts/info',1)">
					<weui-input v-model="ruleform.info" label="店铺信息" type="txt" name="info" arrow></weui-input>
				</view>
				<view @click="goto('/pages/user/setting/layouts/cert',1)">
					<weui-input v-model="ruleform.cert" label="个人信息" type="txt" name="cert" arrow></weui-input>
				</view>
			</view>
			<view class="bg-f mb12">
				<view>
					<weui-input v-model="ruleform.work_status" label="修改营业状态" name="work_status" changeField="value" type="select" dataKey="statusArr" @callback="selectRes"></weui-input>
				</view>
			</view>
			<view class="bg-f mb12">
				<weui-input v-model="ruleform.phone" label="客服电话" type="txt" name="phone" myclass="service_phone"></weui-input>
			</view>
			<view class="bg-f mb12">
				<view @click="goto('/pages/user/setting/layouts/loginPassword',1)">
					<weui-input v-model="ruleform.loginPassword" label="登录密码" type="txt" name="loginPassword" arrow></weui-input>
				</view>
			</view>
			<view class="login_out" @click="lgout">退出登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/merchant/index',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				market:[],
				ruleform:{
					status:'1',
					service_phone: 13,
					loginPassword: '修改密码'
				},
				statusArr: [{
					label: '营业中',
					value: '1',
				},{
					label: '预定中',
					value: '2',
				},{
					label: '休息中',
					value: '3'
				}],
			}
		},
		methods: {
			selectRes(){
				this.postAjax("/merchant/info",this.ruleform).then(msg=>{
					if(msg.data.status == 2){
						this.ajax();
					}
				});
			},
			lgout(){
				this.getConfirm("是否确认退出登录",()=>{
					this.postAjax("/merchant/lgout").then(msg=>{
						if(msg.data.status == 2){
							uni.removeStorageSync('userInfo');
							this.goto("/pages/user/login/main");
						}
					});
				});
			},
			ajax() {
				this.getAjaxForApp(this, {
				
				}).then(msg => {
					this.ruleform = msg.detail
					this.market = msg.market;
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